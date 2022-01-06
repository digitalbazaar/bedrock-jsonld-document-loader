/*
 * Copyright (c) 2019 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const {config} = require('bedrock');
const path = require('path');

// set this to false to ignore SSL errors in development
config['https-agent'].rejectUnauthorized = false;

config.mocha.tests.push(path.join(__dirname, 'mocha'));
