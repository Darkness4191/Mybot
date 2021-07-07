module.exports = {
    execute: function (message) {
        message.mentions.users.each(user => {
            message.channel.send(user.avatarURL() + '?size=256')
        })
    },
    usage: '[@user]',
    role: ''
}