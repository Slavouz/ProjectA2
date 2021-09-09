const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
    .addStringOption(option => option.setName('jumlah').setDescription('Masukkan jumlah pesan yang ingin dihapus'))
		.setDescription('SWEEP SWEEP SWEEP'),
	async execute(interaction, client) {
    try{
      return interaction.reply({content: 'Not yet.'});
    }catch(err){
      console.log(err);
    }
	},
};