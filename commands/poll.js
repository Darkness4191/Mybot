const reactionEvent = require('../events/ReactionAddEvent.js')
const config = require('../config.json')
const Discord = require('discord.js')

let polls = [];

module.exports = {
    execute: function (message) {
        polls.push(new poll(message))
    },

    registerEmbed: function (embed) {
        polls.push(new pollr(embed))
    },

    resetVotes: function (message) {
        let pollname = message.content.substr(message.content.split(' ')[0].length + 1)

        for(let i = 0; i < polls.length; i++) {
            if(polls[i].title === pollname) {
                polls[i].nullvotes();
                polls[i].update();
            }
        }
    },

    vote: function (message) {
        let pollname = message.content.split(', ')[0].substr(message.content.split(' ')[0].length + 1)
        let option = message.content.split(', ')[1]

        for(let i = 0; i < polls.length; i++) {
            if(polls[i].title === pollname) {
                polls[i].addvote(message, option, message.member.user)
            }
        }
    },
    usage: '[Title], [option 1], [option 2], [option 3]...',
    role: ''
}

//use with .poll
function poll(message) {
    let options = {}
    let usersvoted = []
    let split = message.content.split(', ')
    this.title = message.content.split(', ')[0].substr(message.content.split(' ')[0].length + 1)
    
    let embed = new Discord.MessageEmbed().setTitle(this.title).setColor(config.comms.embedColor)

    for(let i = 1; i < split.length; i++) {
        options[split[i]] = {value: 0}
        embed.addField(split[i], '0 votes')
    }

    let msg;
    message.channel.send(embed).then(mess => {
        msg = mess;
    })

    this.update = function () {
        let eembed = new Discord.MessageEmbed().setTitle(this.title).setColor(config.comms.embedColor)

        for(let opt in options) {
            if(options[opt].value > 1 || options[opt].value === 0) {
                eembed.addField(opt, `${options[opt].value} votes`)
            } else {
                eembed.addField(opt, `${options[opt].value} vote`)
            }
        }

        console.log(`${this.title} updated`)

        return msg.edit(eembed)
    }

    this.addvote = function (message, option, user) {
        if(!usersvoted.includes(user)) {
            usersvoted.push(user)
            options[option].value = options[option].value + 1
            this.update().then(() => {
                message.delete();
            })
        }
    }

    this.nullvotes = function () {
        usersvoted = []
        for(let opt in options) {
            options[opt].value = 0;
        }
    }
}

//use with "register an embed" 
function pollr(msgembed) {
    let options = {}
    let usersvoted = []
    let mee = msgembed.embeds[0]
    this.title = mee.title

    for(let i = 0; i < mee.fields.length; i++) {
        options[mee.fields[i].name] = {value: parseInt(mee.fields[i].value.split(' ')[0])}
    }

    this.update = function () {
        let eembed = new Discord.MessageEmbed().setTitle(this.title).setColor(mee.color)

         for(let opt in options) {
            if(options[opt].value > 1 || options[opt].value === 0) {
                eembed.addField(opt, `${options[opt].value} votes`)
            } else {
                eembed.addField(opt, `${options[opt].value} vote`)
            }
        }

        console.log(`${this.title} updated`)
        
        return msgembed.edit(eembed)
    }

    this.addvote = function (message, option, user) {
        if(!usersvoted.includes(user)) {
            usersvoted.push(user)
            options[option].value = options[option].value + 1
            this.update().then(() => {
                message.delete();
            })
        }
    }

    this.nullvotes = function () {
        usersvoted = []
        for(let opt in options) {
            options[opt].value = 0;
        }
    }
}