/* eslint-env node */
/* eslint-disable global-require */

try {
  module.exports = require('./dist/client');
} catch (error) {
  if (error.code === 'MODULE_NOT_FOUND') {
    require('babel-register');
    require('ts-node').register(require('../../tsconfig.json'));
    module.exports = require('./src/client');
  } else {
    throw error;
  }
}