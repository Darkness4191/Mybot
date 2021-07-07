module.exports = {
    execute: function (message) {
        console.log('Stopping services...')
        message.client.destroy();
        process.exit(0);
    },
    usage: '',
    role: '500259337411887104'
}