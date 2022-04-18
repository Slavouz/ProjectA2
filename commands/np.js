const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("np").setDescription("Whut's playin' rn?"),
  async execute(interaction) {
    try {
      const { queue } = require("../events/music.js");
      // eslint-disable-next-line prefer-const
      if (queue == undefined || queue.length == 0) {
        const emr = new MessageEmbed().setColor("#ff0000").setDescription("<:Rita_Shock:942451387176976426> There's no song in the queue for me to play. Add a song first using **/play (title)**");
        return interaction.reply({ embeds: [emr] });
      }
      // else {
      // 	const emb = new MessageEmbed()
      // 		.setColor('#58b9ff')
      // 		.setTitle('Now Playing')
      // 		.setDescription(`[${queue[0][0]}](${queue[0][1]})\n${queue[0][5]}`)
      // 		.setThumbnail(`${queue[0][2]}`)
      // 		.setFooter({ text: `Added by ${queue[0][3]}`, iconURL: `${queue[0][4]}` });
      // 	return interaction.reply({ embeds: [emb] });
      // }
    } catch (err) {
      console.log(err);
      interaction.channel.send(`**Sum ting wong:**${err}`);
    }
  },
};
