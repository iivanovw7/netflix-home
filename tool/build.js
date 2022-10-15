/**
 * Build util.
 * @module _/tool/build
 */

'use strict';

const { build, mergeConfig } = require('vite');

const env = require('./env').getEnv('production');
const { logger } = require('./utils');

const config = mergeConfig(require('../config/vite/vite.prod')(env), {});

build(config)
    .then(() => {
        logger.success('✓ Build is finished.');
    })
    // eslint-disable-next-line dot-notation
    .catch((errorData) => {
        logger.error('✗ Build was stopped due to errors.');

        logger.error(errorData.stack || errorData);

        if (errorData.details) {
            logger.error(errorData.details);
        }
    });
