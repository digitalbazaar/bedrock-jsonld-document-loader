/*!
 * Copyright (c) 2019-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {agent} from '@bedrock/https-agent';
import {createRequire} from 'module';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';
const require = createRequire(import.meta.url);
const {httpClient} = require('@digitalbazaar/http-client');

const jdl = new JsonLdDocumentLoader();

export const httpClientHandler = {
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

export const jsonLdDocumentLoader = jdl;
export const documentLoader = jdl.documentLoader.bind(jdl);
export {JsonLdDocumentLoader};
