const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    let apex = "852723858636800011";
    let genshin = "852724961609252874";
    let osu = "852725050532691999";
    let soulworker = "852725131830624296";
    let csgo = "852725202894979112";
    let gmod = "852725337233424415";
    let lol = "852725466934935563";
    let minkrep = "852725559103586304";
    let arknek = "889334352192888853";
    let honkai = "899522864322060318";
    let pgr = "899624944000978955";
    let blueArchive = "905146893062012988";
    let amogus = "758194936498749440";
    let gfl = "955853512246460507";
    let msg = [];
    var rolesPick = [];
    var roleAdd = [];
    var roleRemove = [];
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === "roleAssignBtn") {
      //interaction.deferUpdate();
      const rPick = interaction.values;
      //interaction.channel.send(rPick);

      if (rPick.includes("chk_osu")) {
        rolesPick.push(osu);
      }
      if (rPick.includes("chk_soulworker")) {
        rolesPick.push(soulworker);
      }
      if (rPick.includes("chk_minecraft")) {
        rolesPick.push(minkrep);
      }
      if (rPick.includes("chk_lol")) {
        rolesPick.push(lol);
      }
      if (rPick.includes("chk_gmod")) {
        rolesPick.push(gmod);
      }
      if (rPick.includes("chk_genshin")) {
        rolesPick.push(genshin);
      }
      if (rPick.includes("chk_csgo")) {
        rolesPick.push(csgo);
      }
      if (rPick.includes("chk_amogus")) {
        rolesPick.push(amogus);
      }
      if (rPick.includes("chk_apex")) {
        rolesPick.push(apex);
      }
      if (rPick.includes("chk_arknek")) {
        rolesPick.push(arknek);
      }
      if (rPick.includes("chk_honkai")) {
        rolesPick.push(honkai);
      }
      if (rPick.includes("chk_pgr")) {
        rolesPick.push(pgr);
      }
      if (rPick.includes("chk_ba")) {
        rolesPick.push(blueArchive);
      }
      if (rPick.includes("chk_gfl")) {
        rolesPick.push(gfl);
      }

      // console.log(rolesPick);

      for (let i = 0; i < rolesPick.length; ) {
        if (!interaction.member.roles.cache.has(rolesPick[0])) {
          interaction.member.roles.add(rolesPick[0]);
          roleAdd.push("<@&" + rolesPick[0] + ">");
        } else {
          interaction.member.roles.remove(rolesPick[0]);
          roleRemove.push("<@&" + rolesPick[0] + ">");
        }
        rolesPick.splice(0, 1);
      }

      if (!roleAdd.length == 0) {
        msg.push(`**Role Added: **${roleAdd.join(", ")}`);
        //interaction.reply({content: `**Role Added: **${roleAdd.join(', ')}`, ephemeral: true});
      }
      if (!roleRemove.length == 0) {
        msg.push(`**Role Removed: **${roleRemove.join(", ")}`);
        //interaction.reply({content: `**Role Removed: **${roleRemove.join(', ')}`, ephemeral: true});
      }
      interaction.reply({ content: msg.join("\n"), ephemeral: true });
    }
  },
};
