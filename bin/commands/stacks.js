
module.exports = {
    command: 'stacks',
    aliases: ['ss'],
    desc: 'Interact with all Stacks collectively',
    builder: (yargs) => {
        // One can yargs.middleware(middleWareFunc); here
        return yargs.commandDir('./stacks');
    },
    handler: (argv) => {}
};
