const { selectStack, selectApplications } = require('../../../lib/services/configuration');
const dc = require('docker-compose');

module.exports = {
    command: 'clean <stackNameOrId>',
    aliases: ['c'],
    desc: 'Bring down all Applications and Removes Assets for the given Stack',
    builder: (yargs) => {
        yargs
            .positional('stackNameOrId', {
                describe: 'Name or UUID of the Stack to clean'
            })
        ;
    },
    handler: async (argv) => {

        const stack = await selectStack(argv.stackNameOrId);

        for (const application of await selectApplications(stack.applications)) {

            if (!['REPOSITORY', 'LOCAL'].includes(application.type)) {
                continue;
            }

            process.stdout.write(`Cleaning "${application.name}"\n`);

            await dc.down({
                cwd: application.config.path,
                config: application.config['docker-compose-file'] ? application.config['docker-compose-file'] : 'docker-compose.yml',
                log: true,
            });
        }
    }
};
