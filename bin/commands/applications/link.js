const { getConfig, writeConfigFile, selectStack, selectApplication } = require('../../../lib/services/configuration');

module.exports = {
    command: 'link <applicationNameOrId> <stackNameOrId>',
    desc: 'Associates the given Application with the given Stack',
    builder: {},
    handler: async (argv) => {

        const application = await selectApplication(argv.applicationNameOrId);
        const stack = await selectStack(argv.stackNameOrId);

        if (stack.applications.includes(application.id)) {
            process.stderr.write(`Stack "${stack.name}" already includes Application "${application.name}".`);
            return;
        }

        stack.applications.push(application.id);

        await writeConfigFile();
        process.stdout.write(`Application "${application.name}" added to Stack "${stack.name}".`);
    }
};
