/*
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');
const path = require('path');

const cfg = config['https-agent'] = {};
// set this to false to ignore SSL errors in development
cfg.rejectUnauthorized = false;

config.mocha.tests.push(path.join(__dirname, 'mocha'));
