const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Cek ping mu disini!'),
	async execute(interaction, client) {
    try{
      await interaction.reply({content: 'Pong!', fetchReply: true});
      return interaction.editReply({content: `Pong! ${client.ws.ping}ms.`});  
    }catch(err){
      console.log("Something wrong i can feel it |",err);
    }
	},
};