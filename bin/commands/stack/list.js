const { getConfig } = require('../../../lib/services/configuration');
const sprintf = require('sprintf-js').sprintf;

const nameLen = 20;

const selectStack = async (stackNameOrId) => {
    const config = await getConfig();
    const stacks = config.stacks;

    const stackId = Object.keys(stacks).filter((stackId) => {
        return stackId.toLowerCase() === stackNameOrId.toLowerCase() ||
            stacks[stackId].name.toLowerCase() === stackNameOrId.toLowerCase();
    })[0];

    if (stacks[stackId] === undefined) {
        throw Error(`No Stack found as "${stackNameOrId}"`);
    }

    return stacks[stackId];
};

const selectApplication = async (applicationNameOrId) => {
    const config = await getConfig();
    const applications = config.applications;

    const applicationId = Object.keys(applications).filter((applicationId) => {
        return applicationId.toLowerCase() === applicationNameOrId.toLowerCase() ||
            applications[applicationId].name.toLowerCase() === applicationNameOrId.toLowerCase();
    });

    if (applications[applicationId] === undefined) {
        throw Error(`No Application found as "${applicationNameOrId}"`);
    }

    return applications[applicationId];
};

module.exports = {
    command: 'list <stackNameOrId>',
    aliases: ['ls', 'info'],
    desc: 'Display configuration details for the given Stack',
    builder: {},
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

        for (const applicationId of stack.applications) {
            const application = await selectApplication(applicationId);
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
