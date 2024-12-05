/*!
 * Copyright (c) 2019-2024 Digital Bazaar, Inc. All rights reserved.
 */
import {agent} from '@bedrock/https-agent';
import {config} from '@bedrock/core';
import {httpClient} from '@digitalbazaar/http-client';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';
import {logger} from './logger.js';

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

    return _getJsonData(result);
  }
};

async function _getJsonData(result) {
  if(result.data) {
    return result.data;
  }

  try {
    return await result.json();
  } catch(e) {
    const {url} = result;
    logger.error(`DataError: could not parse JSON from: "${url}"`);
    throw new Error('DataError');
  }
}

export const jsonLdDocumentLoader = jdl;
export const documentLoader = jdl.documentLoader.bind(jdl);
export {JsonLdDocumentLoader};
