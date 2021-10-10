const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
//const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
    .addStringOption(option => option.setName('title').setDescription('Set title').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('Set Description').setRequired(true))
    .addStringOption(option => option.setName('color').setDescription('Set Color (Hex Color Code)').setRequired(true))
    .addChannelOption(option => option.setName('destination').setDescription('Set channel (optional)'))
		.setDescription('Create your own embed'),
	async execute(interaction, client) {
    try{
      if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const color = interaction.options.getString('color');
      const title = interaction.options.getString('title');
      const desc = interaction.options.getString('description');
      const canel = interaction.options.getChannel('destination');
      const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(title)
      .setDescription(desc);
      if(canel == null){
      return interaction.reply({embeds: [embed]});
      }else{
        //const channel = client.channels.cache.get(canel);
        canel.send({embeds: [embed]});
        return interaction.reply({content: 'Sent 👍', ephemeral: true})
      }            
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
    }catch(error){
      console.log(error);
      interaction.reply(`**Error: **${error}`);
  }    
	},
};