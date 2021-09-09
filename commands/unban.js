const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
    .addUserOption(option => option.setName('target').setDescription('Set target').setRequired(true))
		.setDescription('Unban seseorang yang telah terkena ban'),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const member = interaction.options.getMember('target');      
      member.unban();            
      return interaction.reply({content: `Unbanned **${member}**`});
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso"});
    }
	},
};