const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
registerFont('./ARIAL.TTF', { family: 'Arial' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caption')
    .addStringOption(option => option.setName('img-url').setDescription('Masukkan url gambar').setRequired(true))
    .addStringOption(option => option.setName('caption-text').setDescription('Masukkan tulisan').setRequired(true))
  	.setDescription('Beri caption pada gambar.'),
	async execute(interaction, client) {
    try{
      const imgurl = interaction.options.getString('img-url'); 
      const captext = interaction.options.getString('caption-text');

      const background = await Canvas.loadImage(imgurl);
      const canvas = Canvas.createCanvas(background.naturalWidth, background.naturalHeight + 50);
      const context = canvas.getContext('2d');
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(background, 0, 50, background.naturalWidth, background.naturalHeight);
      
      context.fillStyle = "#000000";
      let fontSize = 30;
        do {
          context.font = `${fontSize -= 2}px Arial`;
        } while (context.measureText(captext).width > canvas.width);
      //context.font = '30px Arial';
      context.fillText(captext, 10, canvas.height / 10);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'capt.png');
      //console.log(captext);
      return interaction.reply({files: [attachment]});
    }
    catch(err){
      return interaction.reply({content: `**Error: **${err}`, ephemeral: true});
      console.log(err);
    }
	},
};