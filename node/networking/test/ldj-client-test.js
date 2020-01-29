'use strict';
const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');
const mocha = require("mocha");

mocha.describe('LDJClient', () => {
    let stream = null;
    let client = null;

    mocha.beforeEach(() => {
        stream = new EventEmitter();
        client = new LDJClient(stream);
    });

    mocha.it('should emit a message event from a single data event', done => {
        client.on('message', message => {
            assert.deepEqual(message, {foo: 'bar'});
            done();
        });

        stream.emit('data', `{"foo" : "bar"}\n`);
    });
});