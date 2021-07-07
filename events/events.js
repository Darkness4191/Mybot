const Discord = require('discord.js');
const fs = require('fs');

module.exports.updateEvents = function(client) {
    let plugins = fs.readdirSync('./commands');

    for(let i = 0; i < plugins.length; i++) {
        if(plugins[i] !== 'commands.js' && !commandsList.includes(plugins[i])) {
            plugins[i].setup(client);
        }
    }


};