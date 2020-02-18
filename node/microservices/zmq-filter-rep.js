'use strict';

const fs = require('fs');
const zmq = require('zeromq');

//Socket to respond to client requests.
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

//Listening to tcp port 60401
responder.bind('tcp://127.0.0.1:60401', onerror => {
    console.log('Listening for ZMQ requesters... ')
});

//Close the responder when the node process ends
process.on('SIGINT', () => {
    console.log(' Shutting down ... ');
    responder.close();
});