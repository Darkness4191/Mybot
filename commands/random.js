module.exports = {
    execute: function (message) {
        let uBound = parseInt(message.content.split(' ')[1]);
        let oBound = parseInt(message.content.split(' ')[2]);

        message.channel.send(`${Math.floor(Math.random() * oBound) + uBound}`)
    },
    usage: '[int 1] [int 2]',
    role: ''
}