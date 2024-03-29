/*!
 * Copyright (c) 2019-2024 Digital Bazaar, Inc. All rights reserved.
 */
import {agent} from '@bedrock/https-agent';
import {config} from '@bedrock/core';
import {httpClient} from '@digitalbazaar/http-client';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';

import './config.js';

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
    const {
      httpClientHandler: {fetchOptions}
    } = config['jsonld-document-loader'];
    let result;
    try {
      result = await httpClient.get(url, {...fetchOptions, agent});
    } catch(e) {
      throw new Error('NotFoundError');
    }

    return result.data;
  }
};

export const jsonLdDocumentLoader = jdl;
export const documentLoader = jdl.documentLoader.bind(jdl);
export {JsonLdDocumentLoader};
