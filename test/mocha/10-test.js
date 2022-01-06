/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {documentLoader, jsonLdDocumentLoader, httpClientHandler} =
  require('bedrock-jsonld-document-loader');
const express = require('express');
const fs = require('fs');
const https = require('https');

const TEST_SERVER_PORT = 5000;
const BASE_URL = `https://localhost:${TEST_SERVER_PORT}`;

const key = fs.readFileSync(__dirname + '/key.pem');
const cert = fs.readFileSync(__dirname + '/cert.pem');

// HTTPS agent that ignores TLS errors as test server has invalid cert
// const agent = new https.Agent({rejectUnauthorized: false});

function _startServer({app, port = TEST_SERVER_PORT}) {
  return new Promise(resolve => {
    const server = https.createServer({key, cert}, app);
    server.listen(port, () => {
      console.log(`Test server listening at ${BASE_URL}`);
      return resolve(server);
    });
  });
}

const app = express();
app.use(express.json());

// mount the test routes
app.get('/documents/json',
  // eslint-disable-next-line no-unused-vars
  (req, res, next) => {
    res.json({
      '@context': 'https://schema.org/',
      name: 'John Doe'
    });
  });
app.get('/documents/status/404',
  // eslint-disable-next-line no-unused-vars
  (req, res, next) => {
    res.sendStatus(404);
  });

let server;
before(async () => {
  server = await _startServer({app});
});

after(async () => {
  server.close();
});
describe('bedrock-jsonld-document-loader', () => {
  it('throws NotFoundError on document not found', async () => {
    let result;
    let error;
    const documentUrl = 'https://example.com/foo.jsonld';
    try {
      result = await documentLoader(documentUrl);
    } catch(e) {
      error = e;
    }
    should.not.exist(result);
    should.exist(error);
    error.should.be.instanceOf(Error);
    error.message.should.contain(documentUrl);
  });
  it('properly returns a document', async () => {
    let result;
    let error;
    const documentUrl = 'https://example.com/foo.jsonld';
    const sampleDoc = {
      '@context': 'https://schema.org/',
      name: 'John Doe'
    };
    jsonLdDocumentLoader.addStatic(documentUrl, sampleDoc);
    try {
      result = await documentLoader(documentUrl);
    } catch(e) {
      error = e;
    }
    assertNoError(error);
    should.exist(result);
    result.should.eql({
      contextUrl: null,
      document: sampleDoc,
      documentUrl,
      tag: 'static'
    });
  });
});

describe('httpClientHandler', () => {
  it.only('properly gets document', async () => {
    let result;
    let error;
    const documentUrl = `${BASE_URL}/documents/json`;

    try {
      result = await httpClientHandler.get({url: documentUrl});
    } catch(e) {
      error = e;
    }
    assertNoError(error);
    should.exist(result);
    result.should.eql({
      contextUrl: null,
      document: {
        '@context': 'https://schema.org/',
        name: 'John Doe'
      },
      documentUrl: 'https://localhost:5000/documents/json'
    });
  });
  it('throws error if url does not start with "http"', async () => {
    let result;
    let error;
    const url = 'urn:zcap:xyz';

    try {
      result = await httpClientHandler.get({url});
    } catch(e) {
      error = e;
    }
    should.exist(error);
    should.not.exist(result);
    error.message.should.equal('NotFoundError');
  });
  it('throws error if document is not found', async () => {
    let result;
    let error;
    const documentUrl = 'https://example.com/status/404';

    try {
      result = await httpClientHandler.get({url: documentUrl});
    } catch(e) {
      error = e;
    }
    should.exist(error);
    should.not.exist(result);
    error.message.should.equal('NotFoundError');
  });
});
