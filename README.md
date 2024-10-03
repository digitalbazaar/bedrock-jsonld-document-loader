# JSON-LD Document Loader _(@bedrock/jsonld-document-loader)_

[![Build Status](https://img.shields.io/github/workflow/status/digitalbazaar/bedrock-jsonld-document-loader/Node.js%20CI)](https://github.com/digitalbazaar/bedrock-jsonld-document-loader/actions?query=workflow%3A%22Node.js+CI%22)
[![NPM Version](https://img.shields.io/npm/v/bedrock-jsonld-document-loader.svg)](https://npm.im/bedrock-jsonld-document-loader)

> A document loader API for jsonld.js and the Bedrock ecosystem.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Commercial Support](#commercial-support)
- [License](#license)

## Install

- Node.js 14+ is required.

### NPM

To install via NPM:

```sh
npm install --save @bedrock/jsonld-document-loader
```

### Development

To install locally (for development):

```sh
git clone https://github.com/digitalbazaar/bedrock-jsonld-document-loader.git
cd bedrock-jsonld-document-loader
npm install
```

## Usage

This library exports the following things:

1. A `jsonLdDocumentLoader` instance.
2. A default `documentLoader` function (with an instance bound to it).
3. An `httpClientHandler`, for use with `cfg.documentLoader.mode === 'web'`.

```js
import {documentLoader} from '@bedrock/jsonld-document-loader';
```

### Enabling the HTTP/HTTPS protocol handler

```js
import * as bedrock from '@bedrock/core';
const {config: {'your-project': cfg}} = bedrock;

// Import the loader instance, and not the 'documentLoader' function directly.
import {jsonLdDocumentLoader, httpClientHandler} from
  '@bedrock/jsonld-document-loader';

// if enabled, add loader for remote documents
if(cfg.documentLoader.mode === 'web') {
  jsonLdDocumentLoader.setProtocolHandler({protocol: 'http', handler: httpClientHandler});
  jsonLdDocumentLoader.setProtocolHandler({protocol: 'https', handler: httpClientHandler});
}

export const documentLoader = jsonLdDocumentLoader.build();
```

## Contribute

See [the contribute file](https://github.com/digitalbazaar/bedrock/blob/master/CONTRIBUTING.md)!

PRs accepted.

If editing the Readme, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## Commercial Support

Commercial support for this library is available upon request from
Digital Bazaar: support@digitalbazaar.com

## License

[Bedrock Non-Commercial License v1.0](LICENSE.md) © Digital Bazaar
