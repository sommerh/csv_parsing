const fs = require('fs');
const { parse } = require('csv-parse');

const freqTable = {};
const users = new Set();

const parseSingleCsv = (filePath) => {
  return new Promise(function (resolve) {
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        const userId = row[0];
        const zip = row[row.length - 1];

        // only increment zip code frequency if we haven't seen this user before
        if (!users.has(userId)) {
          if (!(zip in freqTable)) freqTable[zip] = 0;
          freqTable[zip]++;

          users.add(userId);
        }
      })
      .on('error', (error) => {
        console.log('😵‍💫', error.message);
      })
      .on('end', () => {
        console.log('🥳 Parsing Complete');
        resolve();
      });
  });
};

const addToTable = (...path) => {
  const paths = [...path];

  Promise.all(paths.map(parseSingleCsv)).then(() => {
    console.table(freqTable);
    console.log(
      `There are ${users.size} users in ${
        Object.keys(freqTable).length
      } different zip codes!`
    );
  });
};

addToTable(
  './data/Group01.csv',
  './data/Group02.csv',
  './data/Group03.csv',
  './data/Group04.csv',
  './data/Group05.csv',
  './data/Group06.csv',
  './data/Group07.csv',
  './data/Group08.csv',
  './data/Group09.csv',
  './data/Group10.csv'
);
