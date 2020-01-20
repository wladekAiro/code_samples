'use strict';
const fileName = 'target.txt';

require('fs').createReadStream(fileName)
    .on('data', chunk => process.stdout.write((chunk)))
    .on('error', err => process.stderr.write(` ERROR ${err} `));