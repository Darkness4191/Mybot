const fs = require('fs')
const config = require('../config.json');

module.exports = {
    execute: function (message) {
        let files = fs.readdirSync('./commands');
        let finalstr = "```\n"
    
        for(let i = 0; i < files.length; i++) {
            if(files[i] !== 'commands.js' && checkroles(message.member.roles.cache, require('./' + files[i]).role)) {
                let htxt = require('./' + files[i]).usage;
                if(htxt === '') {
                    htxt = '[-]';
                }
    
                finalstr += `${config.comms.prefix}${files[i].split('.')[0]} ${htxt}\n`;
            }
        }
    
        finalstr += '```';
        message.channel.send(finalstr)
    },
    usage: '',
    role: ''
}

function checkroles(roles, id) {
    if(id === '') {
        return true
    }
    
    let r = false;
    roles.each(role => {
        if(role.id === id) {
            r = true
        }
    })

    return r;
}