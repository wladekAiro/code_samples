'use strict';
const fs = require('fs');

fs.writeFile('targets.txt', 'hello node', (err) => {
    if (err){
        throw err;
    }

    console.log(' File saved ')
});

