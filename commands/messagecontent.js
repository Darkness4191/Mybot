module.exports = {
    execute: function (message) {
        message.channel.messages.fetch(message.content.split(' ')[1]).then(fetched => {
            message.channel.send(fetched.content)
            console.log(fetched.content)
        });
    },
    usage: '[message id]',
    role: '500260043535417364'
}