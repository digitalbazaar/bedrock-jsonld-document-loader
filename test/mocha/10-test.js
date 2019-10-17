/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {documentLoader, jsonLdDocumentLoader} =
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
    });
  });
});
