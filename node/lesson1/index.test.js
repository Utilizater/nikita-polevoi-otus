const verticalsConnection = require('./index').verticalsConnection;
const fileHandler = require('./index').fileHandler;
const jsonFile = require('./index').jsonFile;

test('vertical connection', () => {
  const inputArr = [
    ['   ', '   ', '└──', 8],
    ['   ', '   ', '└──', 7],
    ['   ', '└──', 6],
    ['└──', 5],
    ['   ', '└──', 4],
    ['   ', '└──', 3],
    ['└──', 2],
    [1],
  ];
  const outPutArr = [
    ['   ', '   ', '└──', 8],
    ['   ', '   ', '└──', 7],
    ['   ', '└──', 6],
    ['└──', 5],
    ['│  ', '└──', 4],
    ['│  ', '└──', 3],
    ['└──', 2],
    [1],
  ];
  const result = verticalsConnection(inputArr);
  expect(result).toEqual(outPutArr);
});

test('file handler', () => {
  const finalArr = [
    ['   ', '└──', 3],
    ['   ', '└──', 4],
    ['└──', 2],
    ['   ', '   ', '└──', 7],
    ['   ', '   ', '└──', 8],
    ['   ', '└──', 6],
    ['└──', 5],
    [1],
  ];
  const result = fileHandler(jsonFile);
  expect(result).toEqual(finalArr);
});
