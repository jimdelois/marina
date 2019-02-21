
module.exports = {
    command: 'stacks',
    aliases: ['ss'],
    desc: 'Interact with all Stacks collectively',
    builder: (yargs) => {
        return yargs.commandDir('./stacks');
    },
    handler: (argv) => {}
};
