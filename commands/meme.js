const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
registerFont('./impact.ttf', { family: 'Impact' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
    .addStringOption(option => option.setName('img-url').setDescription('Masukkan url gambar').setRequired(true))
    .addStringOption(option => option.setName('top-text').setDescription('Top Text').setRequired(true))
    .addStringOption(option => option.setName('bottom-text').setDescription('Bottom Text')) 
		.setDescription('Make simple meme.'),
	async execute(interaction, client) {
    try{
      const imgurl = interaction.options.getString('img-url');
      const tt = interaction.options.getString('top-text');
      const bt = interaction.options.getString('bottom-text');

      const canvas = Canvas.createCanvas(800, 600);
      const context = canvas.getContext('2d');
      const background = await Canvas.loadImage(imgurl);
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.font = '72px Impact';
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      context.textAlign = "center";
      context.strokeText(tt, canvas.width / 2, canvas.height / 7.5);
      context.fillStyle = '#ffffff';    	      
      context.textAlign = "center";
      context.fillText(tt, canvas.width / 2, canvas.height / 7.5);
      if(bt != null){
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        context.textAlign = "center";
        context.strokeText(bt, canvas.width / 2, canvas.height - (canvas.height / 25));
        context.fillText(bt, canvas.width / 2, canvas.height - (canvas.height / 25));
      }
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'meem.png');

      return interaction.reply({ files: [attachment] });
    }catch(err){
      console.log(err);
    }
	},
};