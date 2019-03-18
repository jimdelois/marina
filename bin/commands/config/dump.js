const { getConfig } = require('../../../lib/services/configuration');

module.exports = {
    command: 'dump',
    aliases: ['d'],
    desc: 'Prints the raw contents of the Marina Config file to STDOUT',
    builder: {},
    handler: async (argv) => {
        const config = await getConfig();
        process.stdout.write(JSON.stringify(config, null, 2));
    }
};
