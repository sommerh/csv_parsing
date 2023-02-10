const fs = require('fs');
const { parse } = require('csv-parse');

const freqTable = {};
const users = new Set();

fs.createReadStream('./data/test.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    const userId = row[0];
    const zip = row[row.length - 1];

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
    console.log(freqTable);
    console.log(
      `We have ${users.size} users in ${
        Object.keys(freqTable).length
      } different zip codes!`
    );
  });
