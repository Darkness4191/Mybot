const Discord = require('discord.js');
const config = require('./config.json');
const commands = require('./commands/commands.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({activity: {
		name: `${config.comms.prefix}help`, 
	}})
	client.user.setUsername(config.bot.name)
	
	commands.updateCommands(client);
});

function exitHandler(options) {
    if (options.cleanup) {
		console.log("Performing cleanup")
		require("./commands/leave.js").execute()
	}
    if (options.exit) {
		try {
			client.destroy()
		} catch(Exception) {
			console.log(Exception)
		} finally {
			process.exit()
		}
	}
}

process.on('exit', exitHandler.bind(null, {cleanup:true}));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

client.login(`${process.env.FIREBOT_TOKEN}`);

module.exports = {
	config: config,
	commands: commands,
	client: client
}
