module.exports = {
    command: 'applications',
    aliases: ['as'],
    desc: 'Interact with the collection of Applications',
    builder: (yargs) => {
        return yargs.commandDir('./applications');
    },
    handler: (argv) => {}
};
