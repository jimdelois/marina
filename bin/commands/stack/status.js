const { getConfig } = require('../../../lib/services/configuration');
const sprintf = require('sprintf-js').sprintf;

module.exports = {
    command: 'status <stackName>',
    aliases: ['ps', 'stat'],
    desc: 'Display Application statuses for the given Stack',
    builder: {},
    handler: async (argv) => {
        const configFile = await getConfig();
        console.log(configFile);
    }
};
