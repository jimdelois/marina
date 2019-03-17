const { getConfig } = require('../../../lib/services/configuration');
const example = require('../../../config/marina-example');

module.exports = {
    command: 'example',
    aliases: ['e'],
    desc: 'Prints an example Marina Config file to STDOUT',
    builder: {},
    handler: async (argv) => {
        process.stdout.write(JSON.stringify(example, null, 2));
    }
};
