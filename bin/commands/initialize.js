const inquirer = require('inquirer');
const skeleton = require('../../config/marina-skeleton');
const { setConfig, configFileExists, writeConfigFile } = require('../../lib/services/configuration');

module.exports = {
    command: 'initialize',
    aliases: ['init', 'i'],
    desc: 'Creates a new Marina config file from scratch and initializes for use',
    builder: (yargs) => {
        yargs
            .option('save', {
                demandOption: true,
                default: true,
                describe: 'Writes the new config file',
                type: 'boolean'
            })
            .option('force', {
                demandOption: true,
                default: false,
                describe: 'Forces file overwrite without prompting',
                type: 'boolean'
            })
        ;
    },
    handler: async (argv) => {

        if (!argv.save) {
            process.stdout.write(JSON.stringify(skeleton, null, 2));
            return;
        }

        setConfig(skeleton);

        let writeFile = true;
        if (!argv.force && configFileExists()) {
            process.stdout.write(`File ${argv.file} exists.\n`);
            const answers = await inquirer.prompt([{
                type: 'confirm',
                name: 'doForce',
                message: 'Overwrite?',
                default: false,
                prefix: '>'
            }]);
            writeFile = answers.doForce;
        }

        if (writeFile) {
            await writeConfigFile();
            process.stdout.write(`Wrote new Config file at ${argv.file}.`);
            return;
        }

        process.stderr.write('Aborted. No Configuration initialized.');
    }
};
