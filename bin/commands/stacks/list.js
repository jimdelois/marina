const { getConfig } = require('../../../lib/services/configuration');
const sprintf = require('sprintf-js').sprintf;

module.exports = {
    command: 'list',
    aliases: ['ls'],
    desc: 'List all configured Stacks',
    builder: {},
    handler: async (argv) => {
        let output = [];
        const nameLen = 20;
        const config = await getConfig();
        const stacks = config.stacks;

        output.push(sprintf(
            `%-${nameLen}s %-36s %4s`,
            'NAME',
            'ID',
            'APPS'
        ));

        Object.keys(stacks).forEach((stackId) => {
            output.push(sprintf(
                `%-${nameLen}s %36s %4d`,
                stacks[stackId].name.slice(0, nameLen),
                stackId,
                stacks[stackId].applications.length
            ));
        });

        process.stdout.write(output.join('\n'));
    }
};
