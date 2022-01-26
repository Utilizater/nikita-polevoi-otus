import fs from 'fs';
import readline from 'readline';
import LineByLineReader from 'line-by-line';

const processStages = {
  firstFilling: 'first filling',
  mainStage: 'mainStage',
};

export default async () => {
  let stage = processStages.firstFilling;
  const path = process.cwd() + '/src/splittedFiles/';
  const readerObj = {};
  const currentValuesObj = {};
  const files = await fs.promises.readdir(path);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const lineReader = new LineByLineReader(path + file);
    lineReader.on('line', async (line) => {
      currentValuesObj[file] = Number.parseInt(line);

      lineReader.pause();

      if (
        stage === processStages.firstFilling &&
        Object.keys(currentValuesObj).length === Object.keys(files).length
      ) {
        stage = processStages.mainStage;

        const minValueFile = getMinValueFile(currentValuesObj);
        const minValue = currentValuesObj[minValueFile];
        await fs.promises.appendFile(
          path + 'finalFile.txt',
          minValue.toString() + '\n'
        );
        delete currentValuesObj[minValueFile];
        readerObj[minValueFile].resume();
      }

      if (stage === processStages.mainStage) {
        const minValueFile = getMinValueFile(currentValuesObj);
        const minValue = currentValuesObj[minValueFile];
        await fs.promises.appendFile(
          path + 'finalFile.txt',
          minValue.toString() + '\n'
        );
        delete currentValuesObj[minValueFile];
        readerObj[minValueFile].resume();
      }
    });

    readerObj[file] = lineReader;
  }
};

// const getLineN = async (pathToFile, lineNumber) => {
//   const readable = fs.createReadStream(pathToFile);
//   const reader = readline.createInterface({ input: readable });
//   let lineCounter = 1;
//   const line = await new Promise((resolve) => {
//     reader.on('line', (line) => {
//       if (lineCounter === lineNumber) {
//         reader.close();
//         resolve(line);
//       }
//       lineCounter++;
//     });
//   });
//   readable.close();
//   return line;
// };

const getMinValueFile = (obj) => {
  let minKey;
  for (let key in obj) {
    if (minKey === undefined || obj[minKey] > obj[key]) {
      minKey = key;
    }
  }
  return minKey;
};
