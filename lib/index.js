/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {agent} = require('bedrock-https-agent');
const {httpClient} = require('@digitalbazaar/http-client');
const {JsonLdDocumentLoader} = require('jsonld-document-loader');

const jdl = new JsonLdDocumentLoader();

const httpClientHandler = {
  /**
   * @param {object} options - Options hashmap.
   * @param {string} options.url - Document URL.
   * @returns {Promise<{contextUrl: null, document, documentUrl}>} - Resolves
   *   with documentLoader document.
   */
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

    return result.data;
  }
};

exports.jsonLdDocumentLoader = jdl;
exports.documentLoader = jdl.documentLoader.bind(jdl);
exports.JsonLdDocumentLoader = JsonLdDocumentLoader;
exports.httpClientHandler = httpClientHandler;
