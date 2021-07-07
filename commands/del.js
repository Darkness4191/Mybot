module.exports = {
    execute: function (message) {
        if(message.content.split(' ').length === 2) {
            message.channel.messages.fetch({limit: parseInt(message.content.split(' ')[1])}).then(fetched => {
                message.channel.bulkDelete(fetched)
            })
        } else {
            message.channel.send('Please provide one argument')
        }
    },
    usage: '[number]',
    role: '500260043535417364'
}