import fs from 'fs';
import path from 'path';

export default async () => {
  const __dir = process.cwd();
  await removerTxtFilesFromDirectory(__dir);
  await removerTxtFilesFromDirectory(path.join(__dir, 'src', 'splittedFiles'));
  console.log('files cleaning is finished');
};

const removerTxtFilesFromDirectory = async (directoryPath) => {
  return new Promise(async (res, rej) => {
    const files = await fs.promises.readdir(directoryPath);
    if (files.length === 0) res(true);
    files.forEach(async (file, index) => {
      const stArr = file.split('.');
      if (stArr[stArr.length - 1] === 'txt') {
        await fs.promises.unlink(path.join(directoryPath, file));
      }
      if (index === files.length - 1) res(true);
    });
  });
};
