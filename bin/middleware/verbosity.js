const logger = require('../../lib/logger');

module.exports = (argv) => {
    if (argv.verbose) {
        logger.level(30); // bunyan.INFO
    }
    if (argv.debug) {
        logger.level(20); // bunyan.DEBUG
    }
};
