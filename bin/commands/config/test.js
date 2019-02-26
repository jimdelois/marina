const { getConfig } = require('../../../lib/services/configuration');

module.exports = {
    command: 'test',
    aliases: ['t'],
    desc: 'Test the validity of the configuration file (currently syntax only)',
    builder: {},
    handler: async (argv) => {
        try {
            // If it loads, it's valid
            await getConfig();
            process.stdout.write('Configuration Syntax OK');
        } catch (e) {
            process.stderr.write(`Configuration INVALID.\n\n    > ${e.message}\n`);
        }

    }
};
