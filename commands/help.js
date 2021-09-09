const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('help')
		.setDescription('Menunjukkan semua commands yang ada.'),		
	async execute(interaction) {
    const helpEmbed = new MessageEmbed()
    .setColor('#ffffff')    
    .setTitle("Bantuan")
    .setDescription("Berikut adalah beberapa command yang bisa anda gunakan:")
    .addFields(
      {
        name: 'Moderator',
        value: 'ban, kick, clear',
        inline: true,
      },
      {
        name: 'General',
        value: 'ping, help',
        inline: true,
      },
      {
        name: 'Fun',
        value: 'dadu, ka, halo, betulkah, choose',
        inline: true,
      },
    );
		return interaction.reply({embeds: [helpEmbed]});
	},
};