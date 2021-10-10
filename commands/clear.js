const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
    .addIntegerOption(option => option.setName('jumlah').setDescription('Set jumlah').setRequired(true))
		.setDescription('SWEEP SWEEP SWEEP')
    .setDefaultPermission(false),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const jml = interaction.options.getInteger('jumlah'); 
      if(jml > 100){
        return interaction.reply({content: "I'm at my limit (Max 100)", ephemeral: true});
      }else{             
        const Channel = interaction.channel;
        const messages = Channel.messages.fetch();
        await Channel.bulkDelete(jml, true);
        return interaction.reply({content: `Done 👌`, ephemeral:true});      
      }      
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
	},
};