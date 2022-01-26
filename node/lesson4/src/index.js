import createFileOfSize from './utils/createFileOfSize.js';
import splitFiles from './utils/splitFiles.js';
import filesCleaning from './utils/filesCleaning.js';
import sortFilesContent from './utils/sortFileContent.js';
import finalSort from './utils/finalSort.js';

const FILE_SIZE = 100000000;

const main = async () => {
  await filesCleaning();

  // const t1 = new Date().valueOf();
  await createFileOfSize('main.txt', FILE_SIZE);
  // const t2 = new Date().valueOf();
  // console.log((t2 - t1) / 1000 + 's');

  await splitFiles('main.txt', 10);
  await sortFilesContent();
  await finalSort();
};

main();
