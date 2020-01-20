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
    connection.write(` now watching ${fileName} for changes ... \n`);

    //Watcher setup
    const watcher = fs.watch(fileName, () => connection.write(` File changed: ${new Date()} \n`));

    //clean up
    connection.on('close', () => {
        console.log(' Subscriber disconnected. \n');
        watcher.close();
    });
}).listen(60300, () => {
    console.log(' Listening for subscribers ... ');
});