const fs = require('fs');
const { parse } = require('csv-parse');

const freqTable = {};

fs.createReadStream('./data/test.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    const zip = row[row.length - 1];

    if (!(zip in freqTable)) freqTable[zip] = 0;
    freqTable[zip]++;
  })
  .on('error', (error) => {
    console.log('😵‍💫', error.message);
  })
  .on('end', () => {
    console.log('🥳 Parsing Complete');
    console.log(freqTable);
    console.log(
      `We have users in ${Object.keys(freqTable).length} different zip codes!`
    );
  });
