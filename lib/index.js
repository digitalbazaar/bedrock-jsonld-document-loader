/*!
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {JsonLdDocumentLoader} = require('jsonld-document-loader');

const jdl = new JsonLdDocumentLoader();
exports.jsonLdDocumentLoader = jdl;
exports.documentLoader = jdl.documentLoader.bind(jdl);
exports.JsonLdDocumentLoader = JsonLdDocumentLoader;
