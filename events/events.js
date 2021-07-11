const Discord = require('discord.js');
const fs = require('fs');

module.exports.updateEvents = function(client) {
    let events = fs.readdirSync('./events');

    for(let i = 0; i < events.length; i++) {
        if(events[i] !== 'events.js' && !commandsList.includes(events[i])) {
            events[i].setup(client);
        }
    }

    
};