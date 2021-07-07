let Discord = require('discord.js')

module.exports = {
    execute: function (message) {
        channels = require("../index.js").client.channels.cache
        channels.each(channel => {
            if(channel.type === 'voice') {
                channel.leave()
            }
        })
    },
    usage: '',
    role: '568876713941925904'
}