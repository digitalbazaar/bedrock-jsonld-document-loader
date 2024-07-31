/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {
  documentLoader, httpClientHandler, jsonLdDocumentLoader
} from '@bedrock/jsonld-document-loader';
import express from 'express';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let BASE_URL;

const key = fs.readFileSync(__dirname + '/key.pem');
const cert = fs.readFileSync(__dirname + '/cert.pem');

function _startServer({app}) {
  return new Promise(resolve => {
    const server = https.createServer({key, cert}, app);
    server.listen(() => {
      const {port} = server.address();
      BASE_URL = `https://localhost:${port}`;
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
  it('properly gets document', async () => {
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
      '@context': 'https://schema.org/',
      name: 'John Doe'
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
