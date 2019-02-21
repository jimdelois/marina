const fsSync = require('fs');
const fs = require('fs').promises;
const logger = require('../logger').get('services/configuration');

let configFile;
let config;

function setConfigFile(file) {
    if (!fsSync.existsSync(file)) {
        throw Error(`Config File Not Found: ${file}`);
    }
    configFile = file;
}

async function getConfig() {
    if (config === undefined) {
        logger.debug('Reading config file: %s', configFile);
        config = JSON.parse(await fs.readFile(configFile, {encoding:'utf8'}));
    }
    return config;
}

// async function writeConfig(file) {
//     return fs.writeFile(file, JSON.stringify(m, null, 2), {encoding:'utf8'});
// }

module.exports = {
    getConfig,
    setConfigFile
};