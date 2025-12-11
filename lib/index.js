/*!
 * Copyright (c) 2019-2025 Digital Bazaar, Inc. All rights reserved.
 */
import * as bedrock from '@bedrock/core';
import {agent} from '@bedrock/https-agent';
import {httpClient} from '@digitalbazaar/http-client';
import {JsonLdDocumentLoader} from 'jsonld-document-loader';

import './config.js';

const {util: {BedrockError}} = bedrock;

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
      // message is `NotFoundError` for backwards compatibility
      throw new BedrockError('NotFoundError', {
        // not an `http` URL
        name: 'NotSupportedError',
        details: {
          httpStatusCode: 400,
          public: true
        }
      });
    }

    const {
      httpClientHandler: {fetchOptions}
    } = bedrock.config['jsonld-document-loader'];
    let result;
    try {
      result = await httpClient.get(url, {...fetchOptions, agent});
    } catch(e) {
      let name = 'OperationError';
      if(e.status === 404) {
        name = 'NotFoundError';
      } else if(e.status === 403) {
        name = 'NotAllowedError';
      } else if(e.status === 503) {
        name = 'TimeoutError';
      }

      // message is `NotFoundError` for backwards compatibility
      throw new BedrockError('NotFoundError', {
        name,
        details: {
          httpStatusCode: e.status ?? 500,
          public: true
        },
        cause: e
      });
    }

    return result.data;
  }
};

export const jsonLdDocumentLoader = jdl;
export const documentLoader = jdl.documentLoader.bind(jdl);
export {JsonLdDocumentLoader};
