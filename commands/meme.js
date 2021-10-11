const { SlashCommandBuilder } = require('@discordjs/builders');
const Canvas = require('canvas');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
registerFont('./impact.ttf', { family: 'Impact' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
    .addStringOption(option => option.setName('img-url').setDescription('Masukkan url gambar').setRequired(true))
    .addStringOption(option => option.setName('top-text').setDescription('Top Text'))
    .addStringOption(option => option.setName('bottom-text').setDescription('Bottom Text')) 
		.setDescription('Make simple meme.'),
	async execute(interaction, client) {
    try{
      const tt = interaction.options.getString('top-text');
      const bt = interaction.options.getString('bottom-text');
      if(tt || bt != null){
        const imgurl = interaction.options.getString('img-url');        
        const background = await Canvas.loadImage(imgurl);
        const canvas = Canvas.createCanvas(background.naturalWidth, background.naturalHeight);
        const context = canvas.getContext('2d');      
        context.drawImage(background, 0, 0, background.naturalWidth, background.naturalHeight);
        let fontSize = 72;
        do {
          context.font = `${fontSize -= 2}px Impact`;
        } while (context.measureText(tt || bt).width > canvas.width - 100);
        //context.font = '62px Impact';
        if(tt != null){
          context.strokeStyle = 'black';
          context.lineWidth = 5;
          context.textAlign = "center";
          context.strokeText(tt, canvas.width / 2, (canvas.height / 10) + 20);
          context.fillStyle = '#ffffff';    	      
          context.textAlign = "center";
          context.fillText(tt, canvas.width / 2, (canvas.height / 10) + 20);
        }      
        if(bt != null){
          context.strokeStyle = 'black';
          context.lineWidth = 5;
          context.textAlign = "center";
          context.strokeText(bt, canvas.width / 2, canvas.height - (canvas.height / 25));
          context.fillStyle = '#ffffff';
          context.fillText(bt, canvas.width / 2, canvas.height - (canvas.height / 25));
        }
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'meem.png');

        return interaction.reply({ files: [attachment] });
      }else{
        return interaction.reply({content: "Yang mau diisi apa?", ephemeral: true});
      }      
    }catch(err){
      interaction.reply({content: `**Error: **${err}`, ephemeral: true});
      console.log(err);
    }
	},
};