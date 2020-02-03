'use strict';

const fs = require('fs');
const zmq = require('zeromq');
const fileName = process.argv[2];

//Create publisher endpoint
const publisher = zmq.socket('pub');

fs.watch(fileName,() => {
    //Send a message to any and all subscribers
    publisher.send(JSON.stringify({
        type: 'changed',
        file: fileName,
        timestamp : Date.now()
    }));
});

//listen to tcp port 60400
publisher.bind('tcp://*:60400', err => {
    if (err){
        throw err;
    }

    console.log(' Listening for zmq subscribers ');
});