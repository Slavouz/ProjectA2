const { SlashCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js');
// const play = require('play-dl');
// const queue = require('../events/music.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('search')
		.addStringOption(option => option.setName('title').setDescription('Set song name / url here').setRequired(true))
		.setDescription('Search some music.'),
	async execute(interaction) {
		try {
			if (!interaction.member.voice.channel) {
				return interaction.reply('Connect to a Voice Channel');
			}
			// else {
			// 	const yts = interaction.options.getString('title');
			// 	let txt = '';
			// 	const yt_info = await play.search(yts, { limit : 5 });
			// 	for (let i = 0; i < yt_info.length; i++) {
			// 		txt += `\`${i + 1}\` [${yt_info[i].title}](${yt_info[i].url})\n`;
			// 	}
			// 	const emb = new MessageEmbed()
			// 		.setColor('#58b9ff')
			// 		.setDescription(`**Results for "${yts}"**\n\n${txt}\nType the number of the song to add it to the playlist`);
			// 	interaction.reply({ embeds : [emb] }).then(() => {
			// 		const filter = (messages) => {
			// 			return messages.author.id == interaction.user.id;
			// 		};
			// 		interaction.channel.awaitMessages({ filter: filter, time: 15000, max: 1, errors: ['time'] })
			// 			.then(messages => {
			// 				queue.push([`${yt_info[messages.first().content - 1].title}`, `${yt_info[messages.first().content - 1].url}`, `${yt_info[messages.first().content - 1].thumbnails[0].url}`, `${interaction.user.username}#${interaction.user.discriminator}`, `${interaction.user.avatarURL({ dynamic: true })}`, `${yt_info[messages.first().content - 1].durationRaw}`]);
			// 				const emn = new MessageEmbed()
			// 					.setColor('#58b9ff')
			// 					.setDescription(`**${yt_info[messages.first().content - 1].title}** has been added to the queue.\n\nYou can type **/queue** to see it.`);
			// 				interaction.channel.send({ embeds : [emn] });
			// 			})
			// 			.catch(() => {
			// 				console.log('User didn\'t enter any input, ignoring...');
			// 			});
			// 	});
			// }
		}
		catch (err) {
			console.log(err);
			interaction.channel.send(`**Sum ting wong:**${err}`);
		}
	},
};