'use strict';

const fs = require('fs');
const zmq = require('zeromq');

//Socket to respond client requests.
const responder = zmq.socket('rep');

//Handle incoming requests
responder.on('message', data => {

    //Pass the incoming message
    const request = JSON.parse(data);
    console.log(`Received request to get: ${request.path}`);

    //Read the file and respond with content
    fs.readFile(request.path, (err, content) => {
        console.log(' Sending response content ');
        responder.send(JSON.stringify(
            {
                content: content.toString(),
                timestamp: Date.now(),
                pid: process.pid
            }
        ));
    });
});