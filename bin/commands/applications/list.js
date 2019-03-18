const { getConfig } = require('../../../lib/services/configuration');
const sprintf = require('sprintf-js').sprintf;

module.exports = {
    command: 'list',
    aliases: ['ls'],
    desc: 'List all Applications',
    builder: {},
    handler: async (argv) => {
        let output = [];
        const nameLen = 20;
        const config = await getConfig();
        const applications = config.applications;

        output.push(sprintf(
            `%-${nameLen}s %-36s %4s`,
            'NAME',
            'ID',
            'TYPE'
        ));

        Object.keys(applications).forEach((applicationId) => {
            output.push(sprintf(
                `%-${nameLen}s %36s %s`,
                applications[applicationId].name.slice(0, nameLen),
                applicationId,
                applications[applicationId].type.charAt(0).toUpperCase() + applications[applicationId].type.toLowerCase().slice(1)
            ));
        });

        process.stdout.write(output.join('\n'));
    }
};
