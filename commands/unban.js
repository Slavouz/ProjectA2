const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
    .addUserOption(option => option.setName('target').setDescription('Set target').setRequired(true))
		.setDescription('Unban seseorang yang telah terkena ban'),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const member = interaction.options.get('target').value;
      const usn = interaction.options.get('target').user.username;
      const dsc = interaction.options.get('target').user.discriminator;
      if(member == null){
        return interaction.reply({content: `Orangnya gak ada disini`, ephemeral: true});
      }else{           
        interaction.guild.bans.remove(member);
        return interaction.reply({content: `Unbanned **${usn}#${dsc}**`});
      }
      
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso"});
    }
	},
};