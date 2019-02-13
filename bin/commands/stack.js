module.exports = {
    command: 'stack',
    aliases: ['s'],
    desc: 'Interact with an individual Stack',
    builder: (yargs) => {
        return yargs.commandDir('./stack');
    },
    handler: (argv) => {}
};
