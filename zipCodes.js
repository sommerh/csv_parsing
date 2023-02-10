const fs = require('fs');
const { parse } = require('csv-parse');

fs.createReadStream('./data/Group01.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (data) => {
    console.log(data);
  })
  .on('error', (error) => {
    console.log('😵‍💫', error.message);
  })
  .on('end', () => {
    console.log('🥳 Parsing Complete');
  });
