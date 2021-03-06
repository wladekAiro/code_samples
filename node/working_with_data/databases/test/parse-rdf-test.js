'use strict';

const fs = require('fs');
const mocha = require("mocha");
const expect = require('chai').expect;

const parseRDF = require('../lib/parse-rdf');

const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

mocha.describe('parseRDF', () => {
    mocha.it('should should be a function', () => {
        expect(parseRDF).to.be.a('function');
    });

    mocha.it('should parse RDF content', () => {
        const book = parseRDF(rdf);
        expect(book).to.be.an('object');
        expect(book).to.have.a.property('id', 132);
    });
});

