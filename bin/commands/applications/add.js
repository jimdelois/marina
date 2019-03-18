const inquirer = require('inquirer');
const uuid = require('uuid/v4');
const { getConfig, writeConfigFile, applicationExists } = require('../../../lib/services/configuration');
const { requireValue } = require('../../helpers/inquirer');

module.exports = {
    command: 'add',
    aliases: ['a'],
    desc: 'Add a new Application to the Configuration',
    builder: (yargs) => {
        yargs
            .option('name', {
                demandOption: false,
                describe: 'Name of the new Application',
                type: 'string'
            })
            .option('type', {
                demandOption: false,
                describe: 'Type of Application',
                type: 'string',
                choices: ['LOCAL', 'IMAGE']
            })
            .option('path', {
                demandOption: false,
                describe: 'Local path to directory of project',
                type: 'string'
            })
            .option('docker-compose-filename', {
                demandOption: false,
                describe: 'Custom docker-compose filename (if not docker-compose.yml)',
                type: 'string'
            })
        ;
    },
    handler: async (argv) => {

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Application Name:',
                validate: requireValue,
                prefix: '>',
                when: !argv.name
            },
            {
                type: 'list',
                name: 'type',
                message: 'Application Type:',
                validate: requireValue,
                prefix: '>',
                when: !argv.type,
                choices: ['LOCAL', 'IMAGE']
            },
            {
                type: 'input',
                name: 'path',
                message: 'Project Directory:',
                validate: requireValue,
                prefix: '>',
                when: !argv.path,
            },
            {
                type: 'input',
                name: 'dockerComposeFile',
                message: 'Docker Compose Filename:',
                default: 'docker-compose.yml',
                validate: requireValue,
                prefix: '>',
                when: !argv.dockerComposeFilename,
            },
        ]);

        const name = argv.name ? argv.name : answers.name;
        const type = argv.type ? argv.type : answers.type;
        const path = argv.path ? argv.path : answers.path;
        let file = argv.dockerComposeFilename ? argv.dockerComposeFilename : answers.dockerComposeFilename;

        if (file === undefined || file === null || file === '' || file === 'docker-compose.yml') {
            file = null;
        }

        if (await applicationExists(name)) {
            process.stderr.write(`Application "${name}" already exists.`);
            return;
        }

        const applications = (await getConfig()).applications;
        const id = uuid();


        applications[id]= {
            id,
            name,
            type,
            config: {
                path,
                'docker-compose-file': file,
                'depends-on': null
            }
        };

        await writeConfigFile();
        process.stdout.write(`Application "${name}" added.`);
    }
};
