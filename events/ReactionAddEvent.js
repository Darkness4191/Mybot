let current_polls = []

module.exports = {
    setup: function (client) {
        client.on('messageReactionAdd', (reaction_orig, user) => {
            
        })
    },

    addpoll: function (poll) {
        current_polls.push(poll)
    }
}