const poll = require('./poll.js')

module.exports = {
    execute: function (message) {
        channelid = message.content.split(' ')[1]
        messageid = message.content.split(' ')[2]

        message.client.channels.cache.get(channelid).messages.fetch(messageid).then(msge => {
            poll.registerEmbed(msge)
            console.log(`Taking control of ${messageid}`)
        })
    },
    usage: '[channed id] [message id]',
    role: '500259337411887104'
}