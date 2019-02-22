const { getConfig } = require('../../../lib/services/configuration');
const sprintf = require('sprintf-js').sprintf;

const nameLen = 20;
let output = '';

module.exports = {
    command: 'list',
    aliases: ['ls'],
    desc: 'List all configured Stacks',
    builder: {},
    handler: async (argv) => {
        const config = await getConfig();
        const stacks = config.stacks;
        Object.keys(stacks).forEach((stackId) => {
            output += sprintf(
                `%-${nameLen}s %36s %4d Applications\n`,
                stacks[stackId].name.slice(0, nameLen),
                stackId,
                stacks[stackId].applications.length
            );
        });

        process.stdout.write(output);
    }
};
