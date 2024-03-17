/*!
 * Copyright (c) 2024 Digital Bazaar, Inc. All rights reserved.
 */
import {config} from '@bedrock/core';

const cfg = config['jsonld-document-loader'] = {};

cfg.httpClientHandler = {
  fetchOptions: {
    // max size for fetched documents (in bytes, ~16 KiB)
    size: 16384,
    // timeout in ms for fetching a document
    timeout: 5000
  }
};
