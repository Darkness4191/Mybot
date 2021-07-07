const fs = require('fs')
const path = require('path')

module.exports = {
    execute: function (message) {
        let keyword = message.content.substr(message.content.split(' ')[0].length + 1);
        let userid = message.member.id;

        let content = require('../data/saves.json');
        if(content.hasOwnProperty(userid) && content[userid].hasOwnProperty(keyword)) {
            delete content[userid][keyword];
            send(`Deleted keyword '${keyword}'`, message.channel, 30000);
        }

        fs.writeFileSync(path.join(__dirname, '../data/saves.json'), JSON.stringify(content, null, 4), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(content, null, 4));
            console.log('writing to ' + '../data/saves.json');
        });
    },
    usage: '[command], [keyword]',
    role: ''
}

function send(string, channel, timeout) {
    channel.send(string).then(msg => {
        msg.client.setTimeout(() => {
            msg.delete();
        }, timeout);
    });
}
