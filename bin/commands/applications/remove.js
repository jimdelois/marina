const { getConfig, writeConfigFile, selectApplication } = require('../../../lib/services/configuration');

module.exports = {
    command: 'remove <applicationNameOrId>',
    aliases: ['r'],
    desc: 'Remove an Application from the Configuration',
    builder: (yargs) => {
        yargs
            .positional('applicationNameOrId', {
                describe: 'Name or UUID of the Application to remove'
            })
        ;
    },
    handler: async (argv) => {

        const config = await getConfig();
        const application = await selectApplication(argv.applicationNameOrId);
        const applications = config.applications;

        delete applications[application.id];

        for (const stackId in config.stacks) {
            config.stacks[stackId].applications = config.stacks[stackId].applications.filter(
                applicationId => applicationId !== application.id
            );
        }

        await writeConfigFile();
        process.stdout.write(`Application "${application.name}" removed.`);
    }
};
