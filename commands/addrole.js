const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
    .addChannelOption(option => option.setName('channel').setDescription('Set channel').setRequired(true))
    .addStringOption(option => option.setName('message-id').setDescription('Set message id').setRequired(true))
    .addRoleOption(option => option.setName('role').setDescription('Set role').setRequired(true))
		.setDescription('Tambah role')
    .setDefaultPermission(false),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const canel = interaction.options.getChannel('channel');
      const messageid = interaction.options.getString('message-id');
      const role = interaction.options.getRole('role');
      
      const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId(messageid)
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);

		  canel.send({content: "Ayonima", components: [row] });
      return interaction.reply({content: "Done(?)", ephemeral: true});
      
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
	},
};