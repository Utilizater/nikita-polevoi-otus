const fs = require('fs');
const pkg = require('lodash');

const file = fs.readFileSync('jsonThree.json');
const jsonFile = JSON.parse(file);

const fileHandler = (jsonFile) => {
  let arr = [];
  const recursion = (obj, parentItem) => {
    //check parent item
    if (parentItem) {
      //check parent item position
      let positionX = null;
      let positionY = null;
      for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
          if (arr[y][x] === parentItem) {
            positionX = x;
            positionY = y;
            break;
          }
        }
      }

      if (positionY !== null && positionX !== null) {
        //create new array row in base of parent row
        const newXRow = [];

        for (let x = 0; x < arr[positionY].length; x++) {
          if (x !== positionX) {
            newXRow.push('   ');
          } else {
            newXRow.push('└──');
            newXRow.push(obj.name);
          }
        }

        arr = [...arr.slice(0, positionY), newXRow, ...arr.slice(positionY)];

        if (obj.items) {
          obj.items.reverse().forEach((element) => {
            recursion(element, obj.name);
          });
        } else {
          return;
        }
      }
    } else {
      //first entry
      arr.push([obj.name]);
      if (obj.items) {
        obj.items.reverse().forEach((element) => {
          recursion(element, obj.name);
        });
      } else {
        return;
      }
    }
  };
  recursion(jsonFile);
  return arr;
};

const verticalsConnection = (inputArr) => {
  const { cloneDeep } = pkg;
  const arr = cloneDeep(inputArr);
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      if (arr[y][x] === '└──') {
        for (let i = y + 1; i < arr.length; i++) {
          if (arr[i][x] === '   ') {
            arr[i][x] = '│  ';
          } else {
            break;
          }
        }
      }
    }
  }
  return arr;
};

let arr = fileHandler(jsonFile);
arr = verticalsConnection(arr);

//render
for (let y = arr.length - 1; y > -1; y--) {
  for (let x = 0; x < arr[y].length; x++) {
    process.stdout.write(`${arr[y][x]}`);
  }
  console.log();
}

module.exports = {
  verticalsConnection,
  fileHandler,
  jsonFile,
};
