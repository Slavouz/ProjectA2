const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
registerFont('./times-new-roman.ttf', { family: 'TNN' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('motivate')
    .addStringOption(option => option.setName('img-url').setDescription('Masukkan url gambar').setRequired(true))
    .addStringOption(option => option.setName('caption-atas').setDescription('Masukkan tulisan atas').setRequired(true))
    .addStringOption(option => option.setName('caption-bawah').setDescription('Masukkan tulisan bawah'))
  	.setDescription('Buat motivasi.'),
	async execute(interaction, client) {
    try{
      const imgurl = interaction.options.getString('img-url');
      const capt = interaction.options.getString('caption-atas');
      const capb = interaction.options.getString('caption-bawah');
      const background = await Canvas.loadImage(imgurl);
      const canvas = Canvas.createCanvas(background.naturalWidth + 40, background.naturalHeight + 145);
      const context = canvas.getContext('2d');
      context.fillStyle = "#000000";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(background, 20, 20, background.naturalWidth, background.naturalHeight);
      context.strokeStyle = '#ffffff';
      context.strokeRect(20, 20, background.naturalWidth, background.naturalHeight);
      context.textAlign = 'center';
      let fontSize = 56;
      context.fillStyle = "#FFFFFF";
      context.textBaseline = "top";
      do {
        context.font = `${fontSize -= 2}px TNN`;
      } while (context.measureText(capt || capb).width > canvas.width);
      //context.font = '30px Arial';
      context.fillText(capt, canvas.width / 2, background.naturalHeight + 30);
      if(capb != null){
        context.font = `${fontSize - 22}px TNN`
        context.fillText(capb, canvas.width / 2, background.naturalHeight + 90);
      }

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'capt.png');
      return interaction.reply({files: [attachment]});
    }
    catch(err){
      if(err.name == 'Error'){
        return interaction.reply({content: '**Error: **Link yang kamu masukkan invalid', ephemeral: true});
      }else{
        return interaction.reply({content: `**Error: **${err}`, ephemeral: true});
      }
      console.log(err);
    }
	},
};