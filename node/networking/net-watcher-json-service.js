'use strict';

const fs =  require('fs');
const net  =  require('net'); // Nodejs networking module
const fileName = process.argv[2];

if (!fileName){
    throw Error(` Error: No filename specified !!! `);
}

net.createServer(connection => {
    // Reporting
    console.log(' Subscriber connected ');
    connection.write(JSON.stringify({type: 'watching', file: fileName}));

    //Watcher setup
    const watcher = fs.watch(fileName,
        () => connection.write(JSON.stringify({type: 'changed', timestamp: Date.now()})));

    //clean up
    connection.on('close', () => {
        console.log(' Subscriber disconnected. \n');
        watcher.close();
    });
}).listen(60300, () => {
    console.log(' Listening for subscribers ... ');
});