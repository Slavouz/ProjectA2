const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embeed')
    .addStringOption(option => option.setName('title').setDescription('Set title').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('Set Description').setRequired(true))
    .addStringOption(option => option.setName('color').setDescription('Set Color').setRequired(true))
		.setDescription('Create your own embed'),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const embed = new Discord.MessageEmbed()
      .setColor('#ffffff')
      return interaction.reply(embed);
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
	},
};