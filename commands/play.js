/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const play = require('play-dl');
const { MessageEmbed, InteractionCollector, Interaction } = require('discord.js');
const { joinVoiceChannel, createAudioResource, createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
// const player = createAudioPlayer({
// 	behaviors: {
// 		noSubscriber : NoSubscriberBehavior.Pause,
// 	},
// });
// const queue = [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.addStringOption(option => option.setName('title').setDescription('Put song name / url (YT) here.'))
		.setDescription('Play some music [BETA].'),
	async execute(interaction) {
		try {
			const { queue } = require('../events/music.js');
			const yts = interaction.options.getString('title');
			if (!interaction.member.voice.channel) {
				const emr = new MessageEmbed()
					.setColor('#ff0000')
					.setDescription('<:Rita_Shock:942451387176976426> Connect to a voice channel first');
				return interaction.reply({ embeds : [emr] });
			}
			else if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id != interaction.guild.me.voice.channelId) {
				const emr = new MessageEmbed()
					.setColor('#ff0000')
					.setDescription('<:Rita_Shock:942451387176976426> You\'re not in my voice channel ');
				return interaction.reply({ embeds : [emr] });
			}
			else if (yts == null) {
				if (queue == undefined || queue.length == 0) {
					const emr = new MessageEmbed()
						.setColor('#ff0000')
						.setDescription('<:Rita_Shock:942451387176976426> There\'s no song in the queue for me to play. Add a song first using **/play (title)**');
					return interaction.reply({ embeds : [emr] });
				}
			}
			else if (yts.startsWith('https') && play.yt_validate(yts) == 'playlist') {
				const playlist = await play.playlist_info(yts, { incomplete : true });
				if (playlist.total_videos > 5) {
					return interaction.reply(`**${playlist.title}** has been added to the queue\nDue to server's limit, only 5 songs from the playlist have been added.`);
				}
				else {
					return interaction.reply(`**${playlist.title}** has been added to the queue`);
				}
			}
			else if (yts.startsWith('https') && play.yt_validate(yts) == 'video') {
				const yt_info = await play.video_info(yts);
				const emn = new MessageEmbed()
					.setColor('#58b9ff')
					.setDescription(`<:Rita_Smile:942452006910562354> **${yt_info.video_details.title}** has been added to the queue.\n\nYou can type **/queue** to see it.`);
				return interaction.reply({ embeds : [emn] });
			}
			else {
				const yt_info = await play.search(yts, { limit: 1 });
				const emn = new MessageEmbed()
					.setColor('#58b9ff')
					.setDescription(`<:Rita_Smile:942452006910562354> **${yt_info[0].title}** has been added to the queue.\n\nYou can type **/queue** to see it.`);
				return interaction.reply({ embeds : [emn] });
			}
		}
		catch (err) {
			console.log(err);
			interaction.channel.send(`**Sum ting wong:**${err}`);
		}
	},
};