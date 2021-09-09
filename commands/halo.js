const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('halo')
		.setDescription('Menyapa dengan bot.'),
	async execute(interaction, client) {
    try{
      const choices=["Hai! :D","Halo juga :D","Ada yang bisa dibantu?"];
      const choice=choices[Math.floor(Math.random() * choices.length)];
      return interaction.reply(`${choice}`);
    }catch(err){
      console.log(err);
    }
	},
};