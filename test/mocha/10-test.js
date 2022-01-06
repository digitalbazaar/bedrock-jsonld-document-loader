/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {documentLoader, jsonLdDocumentLoader, httpClientHandler} =
  require('bedrock-jsonld-document-loader');

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
    const documentUrl = 'https://httpbin.org/json';

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
        slideshow: {
          author: 'Yours Truly',
          date: 'date of publication',
          slides: [
            {
              title: 'Wake up to WonderWidgets!',
              type: 'all'
            },
            {
              items: [
                'Why <em>WonderWidgets</em> are great',
                'Who <em>buys</em> WonderWidgets'
              ],
              title: 'Overview',
              type: 'all'
            }
          ],
          title: 'Sample Slide Show'
        }
      },
      documentUrl: 'https://httpbin.org/json'
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
    const documentUrl = 'http://invalid.org/json';

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
