const Discord = require('discord.js');
const index = require('../index.js');

module.exports = {
    execute: function (message) {
        message.mentions.members.each(obj => {
            let embed = new Discord.MessageEmbed()
                .setColor(index.config.comms.embedColor)
                .addField(`Information of ${obj.user.tag}:`, JSON.stringify(obj, null, 4))
            message.channel.send(embed)
        })
    },
    usage: '[@user]',
    role: '500260043535417364'
}