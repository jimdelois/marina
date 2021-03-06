const { getConfig, writeConfigFile, selectStack, selectApplication } = require('../../../lib/services/configuration');

module.exports = {
    command: 'unlink <applicationNameOrId> [stackNameOrId]',
    desc: 'Removes the given Application from one or all Stacks',
    builder: (yargs) => {
        yargs
            .positional('applicationNameOrId', {
                describe: 'Name or UUID of the Application to detach'
            })
            .positional('stackNameOrId', {
                describe: 'Name or UUID of the target Stack (App removed from all Stacks if omitted)'
            })
        ;
    },
    handler: async (argv) => {

        const application = await selectApplication(argv.applicationNameOrId);
        let stacks = (await getConfig()).stacks;

        if (argv.stackNameOrId) {
            const stack = await selectStack(argv.stackNameOrId);
            stacks = {};
            stacks[stack.id] = stack;
        }

        for (const stackId in stacks) {
            stacks[stackId].applications = stacks[stackId].applications.filter(
                applicationId => applicationId !== application.id
            );
        }

        await writeConfigFile();
        process.stdout.write(`Application "${application.name}" removed from Stack${argv.stackNameOrId ? '' : 's'}.`);
    }
};
