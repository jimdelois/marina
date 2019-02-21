

module.exports = {
    command: 'list',
    aliases: ['ls'],
    desc: 'List all configured Stacks',
    builder: {},
    handler: async (argv) => {
        const configFile = await getConfigFile();
        console.log(configFile);
    }
};
