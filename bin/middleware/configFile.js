const { setConfigFile, setConfigFileSafe } = require('../../lib/services/configuration');
const logger = require('../../lib/logger');

const normalizeCmd = (arr) => arr.join('-');

const configLess = [
    ['config', 'example'],
    ['config', 'e'],
    ['c', 'example'],
    ['c', 'e'],
].map(normalizeCmd);

const configSafe = [
    ['init']
].map(normalizeCmd);

module.exports = (argv) => {
    if (configLess.includes(normalizeCmd(argv._))) {
        logger.get('cli/runner').debug('Skipping file load for Config-less command');
        return;
    }

    if (process.env.MARINA_CONFIG) {
        logger.get('cli/runner').debug('Using MARINA_CONFIG from ENV');
        argv.file = process.env.MARINA_CONFIG;
    }

    (configSafe.includes(normalizeCmd(argv._))
        ? setConfigFileSafe
        : setConfigFile
    )(argv.file);
};
