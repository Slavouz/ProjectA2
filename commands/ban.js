const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
    .addUserOption(option => option.setName('target').setDescription('Set target').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Alasan ban'))    
		.setDescription('Ban user yang meresahkan')
    .setDefaultPermission(false),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const member = interaction.options.getMember('target');      
      const usn = interaction.options.get('target').user.username;
      const dsc = interaction.options.get('target').user.discriminator;
      const alasan = interaction.options.getString('reason');
      const banEmbed = new MessageEmbed()
      .setColor('#ff0000')    
      .setTitle("<:FeelsBanMan:695228252318466099> Banned thanks!")
      .setImage('https://c.tenor.com/20Bv1f8Vx30AAAAC/thor-banned-ban-hammer.gif');
      if(alasan == null){
        banEmbed.setDescription(`**Banned: **${usn}#${dsc}\n**Reason: **gak tau <:KannaWhat:695228702413291520>`);
      }else{
        banEmbed.setDescription(`**Banned: **${usn}#${dsc}\n**Reason: **${alasan}`);
      }      

      member.ban({reason: alasan});            
      return interaction.reply({embeds: [banEmbed]});
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
	},
};