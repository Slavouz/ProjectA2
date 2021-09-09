const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
    .addUserOption(option => option.setName('target').setDescription('Set target').setRequired(true))
		.setDescription('Ban user yang meresahkan'),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const member = interaction.options.getMember('target');      
      //console.log(member);
      member.ban();            
      return interaction.reply({content: `Banned **${member}**`});
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso"});
    }
	},
};