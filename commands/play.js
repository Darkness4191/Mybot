module.exports = {
    execute: function (message) {
        message.member.voice.channel.join().then(connection => {
            connection.play(message.content.split(' ')[1])
        }).catch(console.log)
    },
    usage: '<link>',
    role: '568876713941925904'
}