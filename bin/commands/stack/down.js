const { selectStack, selectApplications } = require('../../../lib/services/configuration');
const dc = require('docker-compose');

module.exports = {
    command: 'down <stackNameOrId>',
    aliases: ['d'],
    desc: 'Bring down all Applications in the given Stack',
    builder: (yargs) => {
        yargs
            .positional('stackNameOrId', {
                describe: 'Name or UUID of the Stack to bring down'
            })
        ;
    },
    handler: async (argv) => {
        const stack = await selectStack(argv.stackNameOrId);

        for (const application of await selectApplications(stack.applications)) {

            if (!['REPOSITORY', 'LOCAL'].includes(application.type)) {
                continue;
            }

            await dc.stop({
                cwd: application.config.path,
                config: application.config['docker-compose-file'] ? application.config['docker-compose-file'] : 'docker-compose.yml',
                log: true,
            });
        }
    }
};
