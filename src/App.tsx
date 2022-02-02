import React from 'react';
import { AvatarUploader } from './components/AvatarUploader';
import { AppContainer } from './components/AppContainer';
import { sleep } from './utils/mock';
import { ThemeProvider } from './components/ThemeProvider';
import { FileChunk } from './utils/files';

let attemps = 0

function App() {

  const onUploadChunk = async (chunk: FileChunk) => {
    await sleep(Math.random() * 2000); 
    // attemps++
    return { data: chunk, error: null }; 
  }

  return (
    <ThemeProvider>
      <AppContainer bg="surface">
        <AvatarUploader
          chunkSize={1024 * 20}
          uploadChunk={onUploadChunk}
          data-testid="avatar-uploader"
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
