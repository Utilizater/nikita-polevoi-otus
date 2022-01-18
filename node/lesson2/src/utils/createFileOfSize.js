import fs from 'fs';

const RANDOM_RANGE = 1000;

export default async (fileName, size) => {
  const CHUNKS_COUNT = 10;

  const chunkSize = Math.floor(size / CHUNKS_COUNT);

  for (let i = 1; i < CHUNKS_COUNT - 1; i++) {
    let st = getRandomNumber();
    while (byteCount(st) <= chunkSize) {
      st += getRow(1000000, getRandomNumber);
    }
    await fs.promises.appendFile(fileName, st);
  }

  const addRandomNumberToFile = async (fileName) => {
    return new Promise((res, rej) => {
      try {
        const randomNumber = getRandomNumber();
        fs.appendFile(fileName, randomNumber, function (err) {
          if (err) rej(err);
          const fileSize = fs.statSync(fileName).size;
          res(fileSize);
        });
      } catch (err) {
        rej(err);
      }
    });
  };
  //100000000 = 100mb

  return new Promise(async (resolve, rejects) => {
    let bits = 0;
    while (bits < size) {
      bits = await addRandomNumberToFile(fileName);
    }
    console.log('main file population is finished');
    resolve(true);
  });
};

const byteCount = (s) => {
  return encodeURI(s).split(/%..|./).length - 1;
};

const getRow = (count, cb) => {
  let st = '';
  for (let i = 0; i < count; i++) {
    st += cb();
  }
  return st;
};

const getRandomNumber = () => Math.floor(Math.random() * RANDOM_RANGE) + '\n';
