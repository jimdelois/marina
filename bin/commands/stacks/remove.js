const { getConfig, writeConfigFile, selectStack } = require('../../../lib/services/configuration');

module.exports = {
    command: 'remove <stackNameOrId>',
    aliases: ['r'],
    desc: 'Remove a Stack from the Configuration',
    builder: (yargs) => {
        yargs
            .positional('stackNameOrId', {
                describe: 'Name or UUID of the Stack to remove'
            })
        ;
    },
    handler: async (argv) => {

        const stack = await selectStack(argv.stackNameOrId);
        const stacks = (await getConfig()).stacks;

        delete stacks[stack.id];

        await writeConfigFile();
        process.stdout.write(`Stack "${stack.name}" removed.`);
    }
};
