const fsSync = require('fs');
const fs = require('fs').promises;
const logger = require('../logger').get('services/configuration');

let configFile;
let config;

const setConfigFile = (file) => {
    if (!fsSync.existsSync(file)) {
        throw Error(`Config File Not Found: ${file}`);
    }
    configFile = file;
};

const setConfigFileSafe = (file) => {
    configFile = file;
};

const configFileExists = () => {
    return fsSync.existsSync(configFile);
};

const getConfig = async () => {
    if (config === undefined) {
        logger.debug('Reading config file: %s', configFile);
        config = JSON.parse(await fs.readFile(configFile, {encoding:'utf8'}));
    }
    return config;
};

const selectItem = async (nameOrId, type) => {
    const config = await getConfig();
    const items = config[type];

    const id = Object.keys(items).filter((id) => {
        return id.toLowerCase() === nameOrId.toLowerCase() ||
            items[id].name.toLowerCase() === nameOrId.toLowerCase();
    });

    if (items[id] === undefined) {
        throw Error(`No ${type} found as "${nameOrId}"`);
    }

    return items[id];
};


const selectStack = async (stackNameOrId) => {
    return await selectItem(stackNameOrId, 'stacks');
};

const stackExists = async (stackNameOrId) => {
    try {
        await selectStack(stackNameOrId);
    } catch (e) {
        return false;
    }

    return true;
};

const applicationExists = async (applicationNameOrId) => {
    try {
        await selectApplication(applicationNameOrId);
    } catch (e) {
        return false;
    }

    return true;
};

const selectApplication = async (applicationNameOrId) => {
    return await selectItem(applicationNameOrId, 'applications');
};

const selectApplications = async (applicationNamesOrIds) => {
    const applications = [];
    for (let i = 0; i < applicationNamesOrIds.length; i++) {
        applications.push(await selectItem(applicationNamesOrIds[i], 'applications'));
    }
    return applications;
};

const writeConfigFile = async () => {
    return fs.writeFile(configFile, JSON.stringify(config, null, 2), {encoding:'utf8'});
};

const setConfig = (cfg) => {
    config = cfg;
};

module.exports = {
    getConfig,
    setConfig,
    setConfigFile,
    setConfigFileSafe,
    selectStack,
    stackExists,
    selectApplication,
    selectApplications,
    applicationExists,
    writeConfigFile,
    configFileExists,
};