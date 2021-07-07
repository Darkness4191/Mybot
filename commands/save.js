const fs = require('fs')
const path = require('path')

module.exports = {
    execute: function (message) {
        let command = message.content.substr(message.content.split(' ')[0].length + 1).split(', ')[0]
        let keyword = message.content.split(', ')[1]
        let userid = message.member.id

        if(keyword.includes(' ')) {
            send('Error: Keyword can\'t contain spaces', message.channel, 30000)
            return;
        }

        let content = require('../data/saves.json');
        if(content.hasOwnProperty(userid)) {
            if(content[userid].length <= 5 || checkroles(message.member.roles.cache, '500260043535417364')) {
                content[userid][keyword] = command
                send(`Changed '${command}' to work with keyword '${keyword}'`, message.channel, 30000)
            } else {
                send('Can\'t add the command: Your 5 slotes are already full', message.channel, 30000)
            }
        } else {
            let map = {}
            map[keyword] = command
            content[userid] = map
            send(`Added '${command}' to work with keyword '${keyword}'`, message.channel, 30000)
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

function checkroles(roles, id) {
    let r = false;
    roles.each(role => {
        if(role.id === id) {
            r = true
        }
    })

    return r;
}