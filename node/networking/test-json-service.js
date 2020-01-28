'use strict';

const server = require('net').createServer(connection => {
    console.log(' Subscriber connected');
    //Two message chunks that together make a whole message
    const firstChunk = `{"type":"changed", "timesta`;
    const secondChunk = `mp":1450694370094}\n`;

    //send first chunk immediately
    connection.write(firstChunk);

    //send second chunk after a short delay
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        connection.end();
    }, 100);

    //clear timer when timer ends
    connection.on('end', () => {
        //clear timer
        clearTimeout(timer);
        console.log(' Subscriber disconnected ');
    });
});

server.listen(60300, () => {
    console.log('Server listening for subscribers');
});