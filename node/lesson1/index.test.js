const verticalsConnection = require('./index').verticalsConnection;
const fileHandler = require('./index').fileHandler;
const jsonFile = require('./index').jsonFile;
const getObjFromJson = require('./index').getObjFromJson;

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

test('get json object', () => {
  const expectedObj = {
    name: 1,
    items: [
      { name: 2, items: [{ name: 3 }, { name: 4 }] },
      {
        name: 5,
        items: [{ name: 6, items: [{ name: 7 }, { name: 8 }] }],
      },
    ],
  };
  const result = getObjFromJson('jsonThree.json');
  expect(result).toEqual(expectedObj);
});
