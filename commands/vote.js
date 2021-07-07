const poll = require('./poll.js')

module.exports = {
    execute: function (message) {
        poll.vote(message)
    },
    usage: '[Title], [option]',
    role: ''
}
