import { read } from "fs";

export interface FileChunk {
  chunk: Chunk
  file: Pick<File, 'type' | 'size' | 'name' | 'lastModified'>
}

export interface Chunk {
  chunk: string | null | undefined
  index: number
}

export const getFileBase64 = <T extends string | ArrayBuffer>(file: File) =>
  new Promise<T>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as T)
    };
    reader.onerror = reject
  })

export const getFileChunks = (file: File, { chunkSize = 10240 }: { chunkSize?: number } = {}) => {
  return new Promise<Chunk[]>((resolve, reject) => {
    if(chunkSize < 1){
      throw Error('chunkSize cannot be < 1')
    }

    const size = file.size;
    const reader = new FileReader();
    const chunks: Chunk[] = []
    let loaded = 0;
    let index = 0
    // initial chunk
    let chunk = file.slice(0, chunkSize);
    reader.readAsBinaryString(chunk);
    reader.onload = function (e) {
      chunks.push({ chunk: e.target?.result as string, index })
      index++
      loaded += chunkSize;
      if (loaded <= size) {
        chunk = file.slice(loaded, loaded + chunkSize);
        reader.readAsBinaryString(chunk);
      } else {
        loaded = size;
        // chunks loading done        
        resolve(chunks)
      }
    };
    reader.onerror = reject
  })
}