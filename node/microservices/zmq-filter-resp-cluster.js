'use strict';

const cluster = require('cluster');
const fs = require('fs');
const zmq = require('zeromq');

const numWorkers = require('os').cpus().length;

if (cluster.isMaster){
    //Master process creates ROUTER and DEALER sockets and binds endpoints;
    const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
    const dealer  = zmq.socket('dealer').bind('tcp://filer-dealer.ipc');

    //Forward messages between the router and dealer
    router.on('message', (...frames) => dealer.send(frames));
    dealer.on('message', (...frames) => router.send(frames));

    //Listen for workers to come online
    cluster.on('online', worker => console.log(` Worker ${worker.process.pid} is online`));

    //Fork a worker process for each
    for (let i = 0; i < numWorkers; i++){
        cluster.fork();
    }
}else {

}