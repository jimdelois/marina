const { selectStack, selectApplications } = require('../../../lib/services/configuration');
const sprintf = require('sprintf-js').sprintf;

const nameLen = 20;

module.exports = {
    command: 'list <stackNameOrId>',
    aliases: ['ls', 'info'],
    desc: 'Display configuration details for the given Stack',
    builder: (yargs) => {
        yargs
            .positional('stackNameOrId', {
                describe: 'Name or UUID of the Stack to display'
            })
        ;
    },
    handler: async (argv) => {
        let output = [];
        const stack = await selectStack(argv.stackNameOrId);

        output.push(sprintf(
            `%-${nameLen}s %-36s %4s`,
            'STACK NAME',
            'ID',
            'APPS'
        ));

        output.push(sprintf(
            `%-${nameLen}s %36s %4d`,
            stack.name.slice(0, nameLen),
            stack.id,
            stack.applications.length
        ));

        output.push('');

        output.push(sprintf(
            `%-${nameLen}s %-36s %s`,
            'APP NAME',
            'ID',
            'TYPE'
        ));

        for (const application of await selectApplications(stack.applications)) {
            output.push(sprintf(
                `%-${nameLen}s %36s %s`,
                application.name.slice(0, nameLen),
                application.id,
                application.type.charAt(0).toUpperCase() + application.type.toLowerCase().slice(1)
            ));
        }

        process.stdout.write(output.join('\n'));
    }
};
