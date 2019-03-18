module.exports = {
    command: 'stacks',
    aliases: ['ss'],
    desc: 'Interact with the collection of Stacks',
    builder: (yargs) => {
        // One can yargs.middleware(middleWareFunc); here
        return yargs.commandDir('./stacks');
    },
    handler: (argv) => {}
};
