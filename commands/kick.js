const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
    .addUserOption(option => option.setName('target').setDescription('Set target').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Alasan kick'))
		.setDescription('Kick user yang meresahkan')    
    .setDefaultPermission(false),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const member = interaction.options.getMember('target');  
      const usn = interaction.options.get('target').user.username;
      const dsc = interaction.options.get('target').user.discriminator;    
      const alasan = interaction.options.getString('reason');
      const kickEmbed = new MessageEmbed()
      .setColor('#ff0000')    
      .setTitle("<:FeelsBanMan:695228252318466099> Kicked thanks!");
      if(alasan == null){
        kickEmbed.setDescription(`**Kicked: **${usn}#${dsc}\n**Reason: **gak tau <:KannaWhat:695228702413291520>`);
      }else{
        kickEmbed.setDescription(`**Kicked: **${usn}#${dsc}\n**Reason: **${alasan}`);
      }      
      member.kick({reason: alasan});            
      return interaction.reply({embeds: [kickEmbed]});
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
	},
};