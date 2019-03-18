const { selectStack, selectApplications } = require('../../../lib/services/configuration');
const dc = require('docker-compose');

module.exports = {
    command: 'build <stackNameOrId>',
    aliases: ['b'],
    desc: 'Build all Applications in the given Stack',
    builder: (yargs) => {
        yargs
            .positional('stackNameOrId', {
                describe: 'Name or UUID of the Stack whose Applications are to be built'
            })
        ;
    },
    handler: async (argv) => {
        const stack = await selectStack(argv.stackNameOrId);

        for (const application of await selectApplications(stack.applications)) {

            if (!['REPOSITORY', 'LOCAL'].includes(application.type)) {
                continue;
            }

            await dc.buildAll({
                cwd: application.config.path,
                config: application.config['docker-compose-file'] ? application.config['docker-compose-file'] : 'docker-compose.yml',
                log: true,
            });
        }
    }
};
