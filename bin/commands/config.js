module.exports = {
    command: 'config',
    aliases: ['c'],
    desc: 'Operate with/on a given Configuration file',
    builder: (yargs) => {
        return yargs.commandDir('./config');
    },
    handler: (argv) => {}
};
