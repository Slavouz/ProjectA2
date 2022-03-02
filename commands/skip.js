const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.addIntegerOption(option => option.setName('number').setDescription('Remove selected tracks from queue'))
		.setDescription('Skip the song.'),
	async execute(interaction) {
		try {
			// const { queue } = require('../events/music.js');
			// console.log(`Queue in skip.js = ${queue}`);
			// if (!interaction.guild.me.voice.channel || queue.length == 0) {
			// 	const emr = new MessageEmbed()
			// 		.setColor('#ff0000')
			// 		.setDescription('<:Rita_Shock:942451387176976426> There\'s no song to play right now.');
			// 	return interaction.reply({ embeds : [emr] });
			// }
			if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.me.voice.channelId) {
				return interaction.reply('You\'re not in my voice channel');
			}
			// else {
			// 	return interaction.reply('<:Rita_Smile:942452006910562354> Skipped');
			// }
		}
		catch (err) {
			console.log(err);
			interaction.channel.send(`**Sum ting wong:**${err}`);
		}

	},
};