/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {agent} = require('bedrock-https-agent');
const {httpClient} = require('@digitalbazaar/http-client');
const {JsonLdDocumentLoader} = require('jsonld-document-loader');

const jdl = new JsonLdDocumentLoader();

const webProtocolHandler = {
  async get({url}) {
    if(!url.startsWith('http')) {
      throw new Error('NotFoundError');
    }
    let result;
    try {
      result = await httpClient.get(url, {agent});
    } catch(e) {
      throw new Error('NotFoundError');
    }

    return {
      contextUrl: null,
      document: result.data,
      documentUrl: url
    };
  }
};

exports.jsonLdDocumentLoader = jdl;
exports.documentLoader = jdl.documentLoader.bind(jdl);
exports.JsonLdDocumentLoader = JsonLdDocumentLoader;
exports.webProtocolHandler = webProtocolHandler;
