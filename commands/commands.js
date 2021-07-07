const Discord = require('discord.js');
var fs = require('fs');
const config = require('../config.json');

let commandsList = [];
let isInit = false;

module.exports.updateCommands = function(client) {
    let plugins = fs.readdirSync('./commands');

    for(let i = 0; i < plugins.length; i++) {
        if(plugins[i] !== 'commands.js' && !commandsList.includes(plugins[i])) {
            commandsList.push(plugins[i]);
        }
    }

    if(!isInit) {
        client.on('message', message => {
            try {
                if(message.content.startsWith(config.comms.prefix) && !message.member.user.bot) {
                    executeCommand(message)
                } else if(message.content.startsWith(config.saves.prefix) && !message.member.user.bot) {
                    let content = require('../data/saves.json');

                    if(content.hasOwnProperty(message.member.id)) {
                        let commands = content[message.member.id]
                        let command = '' //with prefix
                        if(message.content.includes(' ')) {
                            command = config.comms.prefix + commands[message.content.substr(1).split(' ')[0]]
                        } else {
                            command = config.comms.prefix + commands[message.content.substr(1)]
                        }

                        message.content = `${command} ${getArgs(message.content)}`;

                        executeCommand(message)
                    }
                }
            } catch(err) {
                console.log(err);
                message.channel.send('Something went wrong while executing the command');
            }
        });

        isInit = true;
    };
};

function executeCommand(msg) {
    let bool = false;
    
    for(let i = 0; i < commandsList.length; i++) {
        if(msg.content.startsWith(`${config.comms.prefix}${commandsList[i].split('.')[0]}`)) {
            bool = true;
            let req = require(`./${commandsList[i]}`)
                            
            if(checkroles(msg.member.roles.cache, req.role)) {
                req.execute(msg);
                console.log(`Executing ${msg.content}`)
            } else if(req.role !== '') {
                msg.channel.send(`You have not the permission to use that command`)
            } else {
                console.log(`Executing ${msg.content}`)
                req.execute(msg);
            }
        }
    }
    
    if(!bool) {
        msg.channel.send(`:x: \"${msg.content}\" is not a valid command`)
    }
}

function getArgs(string) {
    if(string.includes(' ')) {
        return string.substr(string.split(' ')[0].length + 1)
    } else {
        return "";
    }
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