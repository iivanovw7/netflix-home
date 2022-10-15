/**
 * Contains utils.
 * @module _/tool/tool/utils
 */

'use strict';

const pc = require('picocolors');

const logger = {
    info: (...message) => console.log(pc.magenta(message)),
    success: (...message) => console.log(pc.green(message)),
    error: (...message) => console.log(pc.red(message)),
};

module.exports = {
    logger,
};

