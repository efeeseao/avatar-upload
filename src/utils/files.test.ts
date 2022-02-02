import { getFileChunks } from "./files";

describe('getFileBase64', () => {
  it('gets file base 64 correctly', async () => {
    // TODO
  });
})

describe('getFileChunks', () => {
  it('get file chunks correctly', async () => {
    const file = new File(['file content'], 'file.jpg');
    const fileChunks = await getFileChunks(file)
    expect(fileChunks).not.toBeNull()
    expect(fileChunks[0].chunk).toStrictEqual('file content')
  });

  it('get separates chunks by size correctly', async () => {
    // TODO
  });

  it('get file chunks correctly even when chunk size is super small', async () => {
    const file = new File(['file content'], 'file.jpg');
    const fileChunks = await getFileChunks(file, { chunkSize: 1 })
    expect(fileChunks).not.toBeNull()
    expect(fileChunks[0].chunk).toStrictEqual('f')
  });

  it('doesn\'t allow < 1 chunk sizes', async () => {
    // TODO
  });
})

