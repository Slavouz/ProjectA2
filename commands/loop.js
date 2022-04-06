const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Toggle music loop.'),
	async execute(interaction) {
		try {
			if (interaction.member.voice.channel == null) {
				return interaction.reply('You\'re not in any voice channel');
			}
			else if (!interaction.guild.me.voice.channel) {
				return interaction.reply('I\'m not playing anything');
			}
			else if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.me.voice.channelId) {
				return interaction.reply('You\'re not in my voice channel');
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};