const poll = require('./poll.js')

module.exports = {
    execute: function (message) {
        poll.resetVotes(message);
        console.log(`Resetting votes`)
    },
    usage: '',
    role: '500259337411887104'
}