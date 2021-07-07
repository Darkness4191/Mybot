const commands = require('./commands.js');

module.exports = {
    execute: function (message) {
        console.log('Reloading...')
        message.channel.send('Reloading commands...').then(msg => {
            msg.client.setTimeout(() => {
                msg.delete();
            }, 3000);
        });

        commands.updateCommands(message.client);
    },
    usage: '',
    role: '500259337411887104'
}