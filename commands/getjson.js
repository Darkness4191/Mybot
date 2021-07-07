module.exports = {
    execute: function (message) {
        let saves = require(`../data/${message.content.split(' ')[1]}`)
        message.author.send('```' + `Contents of file ${message.content.split(' ')[1]}\n` + JSON.stringify(saves, null, 4) + '```')
    },
    usage: '',
    role: '500259337411887104'
}