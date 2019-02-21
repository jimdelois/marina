const { getConfig } = require('../../../lib/services/configuration');

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
            output += stacks[stackId].name;
        });

        process.stdout.write(output);
    }
};
