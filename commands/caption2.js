const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
registerFont('./ARIAL.TTF', { family: 'Arial' });
registerFont('./Mont-HeavyDEMO.otf', { family: 'Mont' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caption2')
    .addStringOption(option => option.setName('img-url').setDescription('Masukkan url gambar').setRequired(true))
    .addStringOption(option => option.setName('caption-text').setDescription('Masukkan tulisan').setRequired(true))
    .addStringOption(option =>
		option.setName('font')
			.setDescription('Pilih font (Default: Arial)')
			.addChoice('Arial', 'Arial')
			.addChoice('Mont', 'Mont'))
  	.setDescription('Caption, tapi dibawah.'),
	async execute(interaction, client) {
    try{
      const imgurl = interaction.options.getString('img-url'); 
      const captext = interaction.options.getString('caption-text');
      let fontc = interaction.options.getString('font');
      const background = await Canvas.loadImage(imgurl);
      const canvas = Canvas.createCanvas(background.naturalWidth, background.naturalHeight + 50);
      const context = canvas.getContext('2d');
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(background, 0, 0, background.naturalWidth, background.naturalHeight);
      if(fontc == null){
        fontc = 'Arial';
      }
      context.fillStyle = "#000000";
      let fontSize = 30;
        do {
          context.font = `${fontSize -= 2}px ${fontc}`;
        } while (context.measureText(captext).width > canvas.width);
      //context.font = '30px Arial';
      context.fillText(captext, 10, canvas.height - 20);

      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'capt2.png');
      //console.log(captext);
      return interaction.reply({files: [attachment]});
    }
    catch(err){
      if(err.name == 'Error'){
        return interaction.reply({content: '**Error: **Link yang kamu masukkan invalid', ephemeral: true});
      }else{
        return interaction.reply({content: `**Error: **${err}`, ephemeral: true});
      }
    }
	},
};