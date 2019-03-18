const inquirer = require('inquirer');
const uuid = require('uuid/v4');
const { getConfig, writeConfigFile, stackExists } = require('../../../lib/services/configuration');
const { requireValue } = require('../../helpers/inquirer');

module.exports = {
    command: 'add',
    aliases: ['a'],
    desc: 'Add a new Stack to the Configuration',
    builder: (yargs) => {
        yargs
            .option('name', {
                demandOption: false,
                describe: 'Name of the new Stack',
                type: 'string'
            })
    },
    handler: async (argv) => {
        let name = argv.name;
        if (!argv.name) {
            const answers = await inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: 'Stack Name:',
                validate: requireValue,
                prefix: '>'
            }]);
            name = answers.name;
        }

        if (await stackExists(name)) {
            process.stderr.write(`Stack "${name}" already exists.`);
            return;
        }

        const stacks = (await getConfig()).stacks;
        const id = uuid();

        stacks[id]= {
            id: id,
            name: name,
            applications: [],
        };

        writeConfigFile();
        process.stdout.write(`Stack "${name}" added.`);
    }
};
