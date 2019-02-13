#!/usr/bin/env node --no-warnings

const { setConfigFile } = require('../lib/services/configuration');
const yargs = require('yargs');

const defaultConfigLocation = process.env.HOME + '/.marina/marina.json';
// ^^^ TODO: Relative vs. absolute (If starts with "/", assume abs, otherwise rel), use ${__dirname}

const usage = `Marina is a toolset for managing multiple Dockerized application stacks.

General Usage:
  $0 [general options] <command> [command-specific options] [<..etc>]

Examples:
  $0 config test
  $0 -c /path/to/marina.json stacks ls
  $0 stack up StackName`;

const loadConfigurationFile = (argv) => {
    setConfigFile(argv.file);
};

const argv = yargs
    .scriptName('marina')
    .usage(usage)
    .completion('generate-completion', 'Generate a bash completion script')
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .wrap(yargs.terminalWidth()-1)
    .epilog('Copyright 2019 - Jim DeLois - https://github.com/jimdelois/marina')

    // Args
    .option('f', {
        alias: 'file',
        demandOption: true,
        default: defaultConfigLocation,
        describe: 'Configuration file',
        type: 'string'
    })

    // Commands
    .demandCommand(1, 'No commands executed. Please specify a command.')
    .commandDir('./commands')
    .middleware([loadConfigurationFile])
    .argv
;
