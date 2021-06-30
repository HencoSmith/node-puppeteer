/**
 * @description General helper functions
 * @file /components/helpers.js
 * @author Henco Smith 2021
 */

/**
 * Modules.
 */
const moment = require('moment');
const chalk = require('chalk');

/**
 * Exports
 */
module.exports = {
    logger: (msg, color = 'green') => {
        console.info(chalk[color](`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${msg}`));
    },
};
