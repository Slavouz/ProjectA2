const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("help").setDescription("Menunjukkan semua commands yang ada."),
  async execute(interaction) {
    const helpEmbed = new MessageEmbed().setColor("#ffffff").setTitle("Bantuan").setDescription("Berikut adalah beberapa command yang bisa kalian gunakan:");
    helpEmbed.addFields(
      {
        name: "General",
        value: "ping, help",
        inline: true,
      },
      {
        name: "Fun",
        value: "dadu, kerangajaib, halo, choose",
        inline: true,
      },
      {
        name: "Image Manipulation",
        value: "motivate",
        inline: true,
      },
      {
        name: "Music [BETA]",
        value: "play, search, pause, resume, stop, leave, np, skip, queue",
        inline: true,
      }
    );
    if (interaction.member.permissions.has(["ADMINISTRATOR"])) {
      helpEmbed.addFields({
        name: "Moderator",
        value: "ban, kick, clear, embed",
        inline: true,
      });
    }
    return interaction.reply({ embeds: [helpEmbed] });
  },
};
