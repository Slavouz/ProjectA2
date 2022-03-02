const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stop the music and clear the queue.'),
	async execute(interaction) {
		try {
			if (!interaction.member.voice.channel) {
				return interaction.reply('Connect to a Voice Channel');
			}
			else if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.me.voice.channelId) {
				return interaction.reply('You\'re not in my voice channel');
			}
			else {
				return interaction.reply('Stopped ⏹');
			}
		}
		catch (err) {
			console.log(err);
			interaction.channel.send(`**Sum ting wong:**${err}`);
		}
	},
};