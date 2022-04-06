module.exports = {
  name: "guildMemberRemove",
  execute(interaction, client) {
    console.log(`${interaction.user.username} has left the server.`);
    const channel = client.channels.cache.get("849085546345398362");
    if (interaction.guild.id == "445717219331276800") {
      channel.send(`See you next time, ${interaction.user.username}#${interaction.user.discriminator}!`);
    }
  },
};
