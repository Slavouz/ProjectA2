const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
    .addUserOption(option => option.setName('user').setDescription('Set target').setRequired(true))
		.setDescription('Kick user yang meresahkan'),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const member = interaction.options.getMember('user');      
      member.kick();            
      return interaction.reply({content: `Kicked **${member}**`});
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso"});
    }
	},
};