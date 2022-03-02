const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('List the songs in the queue.'),
	async execute(interaction) {
		try {
			const { queue } = require('../events/music.js');
			// console.log(`Queue in queue.js = ${queue}`);
			if (queue == undefined || queue.length == 0) {
				const emr = new MessageEmbed()
					.setColor('#ff0000')
					.setDescription('<:Rita_Shock:942451387176976426> The queue is empty');
				return interaction.reply({ embeds : [emr] });
			}
			else {
				let txtlist = '';
				for (let i = 0; i < queue.length; i++) {
					if (i > 10) {
						txtlist += `\nAnd ${queue.length - 10} more...`;
						break;
					}
					if (queue[i][0].length > 55) {
						queue[i][0] = queue[i][0].substring(0, 55 - 3) + '...';
					}
					if (i == 0) continue;
					txtlist += `\`${i}\` [${queue[i][0]}](${queue[i][1]}) ${queue[i][5]}\n`;
				}
				const emb = new MessageEmbed()
					.setColor('#58b9ff')
					.setTitle(`Music Queue (${queue.length} tracks)`)
					.setDescription(`**Now Playing**\n[${queue[0][0]}](${queue[0][1]}) ${queue[0][5]}\n\n${txtlist}\nWant to remove some tracks? Use **/skip (number of track)**`);
				return interaction.reply({ embeds: [emb] });
			}

		}
		catch (err) {
			console.log(err);
			interaction.channel.send(`**Sum ting wong:**${err}`);
		}
	},
};