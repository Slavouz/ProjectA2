const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client,  Message, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
    var apex = '852723858636800011';
    var genshin = '852724961609252874';
    var osu = '852725050532691999';
    var soulworker = '852725131830624296';
    var csgo = '852725202894979112';
    var gmod = '852725337233424415';
    var lol = '852725466934935563';
    var minkrep = '852725559103586304';
    var arknek = '889334352192888853';
    var honkai = '899522864322060318'; 
    var pgr = '899624944000978955';
    var blueArchive = '905146893062012988';
    var amogus = '758194936498749440';
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'roleAssignBtn') {
      //interaction.deferUpdate();
      let rPick = (interaction.values[0]);
      //interaction.channel.send(rPick);
      switch(rPick){
        case 'chk_osu':
          if(interaction.member.roles.cache.has(osu)){
            interaction.member.roles.remove(osu);
            interaction.reply({content: `<@&${osu}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(osu);
            interaction.reply({content: `<@&${osu}> role added!`, ephemeral:true});
          }
          break;

        case 'chk_soulworker':
          if(interaction.member.roles.cache.has(soulworker)){
            interaction.member.roles.remove(soulworker);
            interaction.reply({content: `<@&${soulworker}> role removed!`, ephemeral:true});
          }else{    
            interaction.member.roles.add(soulworker);
            interaction.reply({content: `<@&${soulworker}> role added!`, ephemeral:true});
          }
          break;

        case 'chk_minecraft':
          if(interaction.member.roles.cache.has(minkrep)){
            interaction.member.roles.remove(minkrep);
            interaction.reply({content: `<@&${minkrep}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(minkrep);
            interaction.reply({content: `<@&${minkrep}> role added!`, ephemeral:true});
          }          
          break;

        case 'chk_lol':
          if(interaction.member.roles.cache.has(lol)){
            interaction.member.roles.remove(lol);
            interaction.reply({content: `<@&${lol}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(lol);
            interaction.reply({content: `<@&${lol}> role added!`, ephemeral:true});
          }          
          break;

        case 'chk_gmod':
          if(interaction.member.roles.cache.has(gmod)){
            interaction.member.roles.remove(gmod);
            interaction.reply({content: `<@&${gmod}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(gmod);
            interaction.reply({content: `<@&${gmod}> role added!`, ephemeral:true});
          }          
          break;

        case 'chk_genshin':
          if(interaction.member.roles.cache.has(genshin)){
            interaction.member.roles.remove(genshin);
            interaction.reply({content: `<@&${genshin}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(genshin);
            interaction.reply({content: `<@&${genshin}> role added!`, ephemeral:true});
          }          
          break;

        case 'chk_csgo':
          if(interaction.member.roles.cache.has(csgo)){
            interaction.member.roles.remove(csgo);
            interaction.reply({content: `<@&${csgo}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(csgo);
            interaction.reply({content: `<@&${csgo}> role added!`, ephemeral:true});
          }          
          break;

        case 'chk_amogus':
          if(interaction.member.roles.cache.has(amogus)){
            interaction.member.roles.remove(amogus);
            interaction.reply({content: `<@&${amogus}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(amogus);
            interaction.reply({content: `<@&${amogus}> role added!`, ephemeral:true});
          }          
          break;
        
        case 'chk_apex':
          if(interaction.member.roles.cache.has(apex)){
            interaction.member.roles.remove(apex);
            interaction.reply({content: `<@&${apex}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(apex);
            interaction.reply({content: `<@&${apex}> role added!`, ephemeral:true});
          }          
          break;

        case 'chk_arknek':
          if(interaction.member.roles.cache.has(arknek)){
            interaction.member.roles.remove(arknek);
            interaction.reply({content: `<@&${arknek}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(arknek);
            interaction.reply({content: `<@&${arknek}> role added!`, ephemeral:true});
          }          
          break;
        
        case 'chk_honkai':
          if(interaction.member.roles.cache.has(honkai)){
            interaction.member.roles.remove(honkai);
            interaction.reply({content: `<@&${honkai}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(honkai);
            interaction.reply({content: `<@&${honkai}> role added!`, ephemeral:true});
          }          
          break;
        
        case 'chk_pgr':
          if(interaction.member.roles.cache.has(pgr)){
            interaction.member.roles.remove(pgr);
            interaction.reply({content: `<@&${pgr}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(pgr);
            interaction.reply({content: `<@&${pgr}> role added!`, ephemeral:true});
          }          
          break;
        
        case 'chk_ba':
          if(interaction.member.roles.cache.has(blueArchive)){
            interaction.member.roles.remove(blueArchive);
            interaction.reply({content: `<@&${blueArchive}> role removed!`, ephemeral:true});
          }else{
            interaction.member.roles.add(blueArchive);
            interaction.reply({content: `<@&${blueArchive}> role added!`, ephemeral:true});
          }          
          break;
      }
    }
  },
};