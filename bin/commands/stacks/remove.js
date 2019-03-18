const { getConfig, writeConfigFile, selectStack } = require('../../../lib/services/configuration');

module.exports = {
    command: 'remove <stackNameOrId>',
    aliases: ['r'],
    desc: 'Remove a Stack from the Configuration',
    builder: (yargs) => {
        yargs
            .option('name', {
                demandOption: false,
                describe: 'Name (or ID) of the Stack to remove',
                type: 'string'
            })
    },
    handler: async (argv) => {

        const stack = await selectStack(argv.stackNameOrId);
        const stacks = (await getConfig()).stacks;

        delete stacks[stack.id];

        writeConfigFile();
        process.stdout.write(`Stack "${stack.name}" removed.`);
    }
};
