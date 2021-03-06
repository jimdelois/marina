const skeleton = require('../../../config/marina-skeleton');

module.exports = {
    command: 'skeleton',
    aliases: ['s'],
    desc: 'Prints a shell Marina Config file to STDOUT',
    builder: {},
    handler: async (argv) => {
        process.stdout.write(JSON.stringify(skeleton, null, 2));
    }
};
