import fs from 'graceful-fs';
import readline from 'readline';
import util from 'util';
import child_process from 'child_process';

const exec = util.promisify(child_process.exec);

async function fileLineCount(fileLocation) {
  const { stdout } = await exec(`cat ${fileLocation} | wc -l`);
  return parseInt(stdout);
}

export default async (fileName, newFilesNumber) => {
  const rowNumbers = await fileLineCount(fileName);

  if (!rowNumbers) throw Error('rowNumbers is empty');
  return new Promise(async (res, rej) => {
    const oneFileLines = Math.floor(rowNumbers / newFilesNumber);
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let fileNumber = 0;
    let rowCounter = 0;
    let mainCounter = 0;
    for await (const line of rl) {
      rowCounter++;
      mainCounter++;
      await fs.promises.appendFile(
        process.cwd() + `/src/splittedFiles/${fileNumber}.txt`,
        line + '\n'
      );
      if (rowCounter >= oneFileLines) {
        rowCounter = 0;
        fileNumber++;
      }

      if (mainCounter === rowNumbers) {
        console.log('split files is finished');
        res(true);
      }
    }
  });
};
