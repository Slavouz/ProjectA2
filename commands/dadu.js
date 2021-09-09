const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dadu')
		.setDescription('Kocok dadu.'),
	async execute(interaction, client) {
    try{
      await interaction.reply({content: 'Melempar dadu...'});
      await delay(2000);
      return interaction.editReply(`Melempar dadu... ${1 + Math.floor(Math.random()*6)}`);
    }catch(err){
      console.log('Error: ',err);
    }
	},
};