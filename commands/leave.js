const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Leave the voice channel.'),
	async execute(interaction) {
		try {
			if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.me.voice.channelId) {
				return interaction.reply('You\'re not in my voice channel');
			}
			else if (!interaction.guild.me.voice.channel) {
				return interaction.reply('I\'m not playing anything');
			}
			else {
				return interaction.reply({ content: '<:Rita_Smile:942452006910562354> See you next time :)' });
			}
		}
		catch (err) {
			console.log(err);
			interaction.channel.send(`**Sum ting wong:**${err}`);
		}
	},
};