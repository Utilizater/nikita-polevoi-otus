import fs from 'fs';

export default async () => {
  return new Promise(async (res, rej) => {
    const path = process.cwd() + '/src/splittedFiles/';

    fs.readdir(path, async (err, files) => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let data = await fs.promises.readFile(
          path + file,
          'binary' /*oneFileSort(path, file)*/
        );
        await oneFileSort(path, file, data);

        data = null;
      }
      console.log('sort files is finished');
      res(true);
    });
  });
};

const oneFileSort = async (path, file, data) => {
  const finalRow = data
    .toString()
    .split('\n')
    .filter((el) => el !== '')
    .map((el) => Number.parseInt(el))
    .sort((a, b) => a - b)
    .join('\n');

  return await fs.promises.writeFile(path + file, finalRow);
};
