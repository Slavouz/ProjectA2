const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('choose')
    .addStringOption(option => option.setName('input').setDescription('Masukkan pilihan - piliahmu. Gunakan tanda strip (-) untuk memisah').setRequired(true))
		.setDescription('Bingung mau pilih mana? Coba command ini.'),
	async execute(interaction, client) {
    try{
      const pil = interaction.options.getString('input');
      const choices = pil.split("-");
      const choice = choices[Math.floor(Math.random() * choices.length)];
      await interaction.reply({content: `${choice}`});
    }catch(err){
      console.log(err);
    }
	},
};