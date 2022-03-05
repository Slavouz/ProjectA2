/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const { createAudioPlayer, NoSubscriberBehavior, joinVoiceChannel, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require("@discordjs/voice");
const validUrl = require("valid-url");
const { MessageEmbed } = require("discord.js");
const play = require("play-dl");
const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
let queue = [];
let chan;
module.exports = { queue, player };

async function playMusic() {
  const stream = await play.stream(queue[0][1]);
  const resource = createAudioResource(stream.stream, {
    inputType: stream.type,
  });
  player.play(resource, { seek: 0, volume: 1 });
}

player.on(AudioPlayerStatus.Playing, () => {
  const emb = new MessageEmbed()
    .setColor("#58b9ff")
    .setTitle("Now Playing")
    .setDescription(`[${queue[0][0]}](${queue[0][1]})`)
    .setThumbnail(`${queue[0][2]}`)
    .setFooter({ text: `Added by ${queue[0][3]}`, iconURL: `${queue[0][4]}` });
  chan.send({ embeds: [emb] });
  console.log(`Playing ${queue[0][0]}`);
  console.log(`playing check = ${player.state.status}`);
});

player.on(AudioPlayerStatus.Idle, () => {
  console.log(`idle check = ${player.state.status}`);
  if (queue.length > 0) {
    queue.splice(0, 1);
    module.exports = { queue };
    if (queue.length > 0) {
      playMusic();
    }
    // for debugging purpose
    console.table(queue);
    console.log(queue.length);
  }
});

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (!interaction.isCommand()) return;
      const yts = interaction.options.getString("title");
      chan = interaction.channel;
      if (interaction.commandName == "play") {
        // for debugging purposes
        console.log(`queue length = ${queue.length}`);
        if (yts != null && interaction.member.voice.channel) {
          if (interaction.member.voice.channel.id != interaction.guild.me.voice.channelId) {
            const connection = joinVoiceChannel({
              channelId: interaction.member.voice.channel.id,
              guildId: interaction.guildId,
              adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            connection.subscribe(player);
          }
          // if yts isn't null
          if (yts.startsWith("https") && play.yt_validate(yts) == "playlist") {
            console.log("Playlist true");
            const playlist = await play.playlist_info(yts, { incomplete: true });
            const videos = await playlist.all_videos();
            console.log(`Playlist video count = ${playlist.total_videos}`);
            for (let i = 0; i < playlist.total_videos - 1; i++) {
              if (i > 4) break;
              queue.push([
                `${videos[i].title}`,
                `${videos[i].url}`,
                `${videos[i].thumbnails[0].url}`,
                `${interaction.user.username}#${interaction.user.discriminator}`,
                `${interaction.user.avatarURL({ dynamic: true })}`,
                `${videos[i].durationRaw}`,
              ]);
            }
            module.exports = { queue };
            if (player.state.status != "playing") {
              const yt_info = await play.video_info(videos[0].url);
              const stream = await play.stream_from_info(yt_info);
              const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
              });
              player.play(resource);
            }
          } else if (yts.startsWith("https") && play.yt_validate(yts) == "video") {
            console.log("Video true");
            const yt_info = await play.video_info(yts);
            const stream = await play.stream_from_info(yt_info);
            const resource = createAudioResource(stream.stream, {
              inputType: stream.type,
            });
            queue.push([
              `${yt_info.video_details.title}`,
              `${yt_info.video_details.url}`,
              `${yt_info.video_details.thumbnails[0].url}`,
              `${interaction.user.username}#${interaction.user.discriminator}`,
              `${interaction.user.avatarURL({ dynamic: true })}`,
              `${yt_info.video_details.durationRaw}`,
            ]);
            module.exports = { queue };
            console.log(`Playing ${queue[0][0]}`);
            if (player.state.status != "playing") {
              player.play(resource);
            }
          } else {
            console.log("Search true");
            const yt_info = await play.search(yts, { limit: 1 });
            const stream = await play.stream(yt_info[0].url);
            const resource = createAudioResource(stream.stream, {
              inputType: stream.type,
            });
            queue.push([
              `${yt_info[0].title}`,
              `${yt_info[0].url}`,
              `${yt_info[0].thumbnails[0].url}`,
              `${interaction.user.username}#${interaction.user.discriminator}`,
              `${interaction.user.avatarURL({ dynamic: true })}`,
              `${yt_info[0].durationRaw}`,
            ]);
            module.exports = { queue };
            console.log(`Playing ${queue[0][0]}`);
            console.table(queue);
            if (player.state.status != "playing") {
              player.play(resource);
            }
          }
        } else if (player.state.status == "paused" && yts == null) {
          const emr = new MessageEmbed().setColor("#ff0000").setDescription("<:Rita_Shock:942451387176976426> The song is paused, use **/resume** instead.");
          return interaction.reply({ embeds: [emr] });
        } else if (player.state.status == "playing" && yts == null) {
          const emr = new MessageEmbed().setColor("#ff0000").setDescription("<:Rita_Shock:942451387176976426> The song is already playing!");
          return interaction.reply({ embeds: [emr] });
        } else if (player.state.status == "idle" && yts == null && queue.length != 0) {
          const stream = await play.stream(queue[0][1]);
          const resource = createAudioResource(stream.stream, {
            inputType: stream.type,
          });
          player.play(resource);
          return interaction.reply("<:Rita_Smile:942452006910562354>");
        }
      }

      if (interaction.commandName === "search" && interaction.member.voice.channel) {
        if (yts.startsWith("https") && play.yt_validate(yts) == "playlist") return interaction.reply("Haha, sorry nope. Use /play instead");
        if (yts.startsWith("https") && play.yt_validate(yts) == "video") return interaction.reply("Why would you search using url, mate?");
        if (!interaction.guild.me.voice.channel) {
          const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
          });
          connection.subscribe(player);
        }
        let txt = "";
        const yt_info = await play.search(yts, { limit: 5 });
        for (let i = 0; i < yt_info.length; i++) {
          txt += `\`${i + 1}\` [${yt_info[i].title}](${yt_info[i].url})\n`;
        }
        const emb = new MessageEmbed().setColor("#58b9ff").setDescription(`**Results for "${yts}"**\n\n${txt}\nType the number of the song to add it to the playlist`);
        interaction.reply({ embeds: [emb] }).then(() => {
          const filter = (messages) => {
            return messages.author.id == interaction.user.id;
          };
          interaction.channel
            .awaitMessages({ filter: filter, time: 15000, max: 1, errors: ["time"] })
            .then((messages) => {
              const emn = new MessageEmbed().setColor("#58b9ff").setDescription(`**${yt_info[messages.first().content - 1].title}** has been added to the queue.\n\nYou can type **/queue** to see it.`);
              interaction.channel.send({ embeds: [emn] });
              queue.push([
                `${yt_info[messages.first().content - 1].title}`,
                `${yt_info[messages.first().content - 1].url}`,
                `${yt_info[messages.first().content - 1].thumbnails[0].url}`,
                `${interaction.user.username}#${interaction.user.discriminator}`,
                `${interaction.user.avatarURL({ dynamic: true })}`,
                `${yt_info[messages.first().content - 1].durationRaw}`,
              ]);
              module.exports = { queue };
              console.table(queue);
              if (player.state.status == "idle") {
                playMusic();
              }
            })
            .catch(() => {
              interaction.channel.send("Invalid input or user didn't enter any input");
            });
        });
      }

      if (interaction.commandName === "np") {
        if (player.state.status == "playing") {
          const emb = new MessageEmbed()
            .setColor("#58b9ff")
            .setTitle("Now Playing")
            .setDescription(`[${queue[0][0]}](${queue[0][1]})\n${queue[0][5]}`)
            .setThumbnail(`${queue[0][2]}`)
            .setFooter({ text: `Added by ${queue[0][3]}`, iconURL: `${queue[0][4]}` });
          return interaction.reply({ embeds: [emb] });
        }
      }

      if (interaction.commandName === "pause") {
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id == interaction.guild.me.voice.channelId) {
          player.pause();
        }
      }

      if (interaction.commandName === "resume") {
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id == interaction.guild.me.voice.channelId) {
          player.unpause();
        }
      }

      if (interaction.commandName === "stop") {
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id == interaction.guild.me.voice.channelId) {
          player.stop();
          queue = [];
          module.exports = { queue };
        }
      }

      if (interaction.commandName == "leave") {
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id == interaction.guild.me.voice.channelId) {
          const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
          });
          // const connection = getVoiceConnection(interaction.guildId);
          player.stop();
          connection.destroy();
          queue = [];
          module.exports = { queue };
          // for debugging purposes
          console.log(`queue length = ${queue.length}`);
          console.log(`player stats = ${player.state.status}`);
        }
      }

      if (interaction.commandName === "skip") {
        if (queue.length == 0) {
          const emr = new MessageEmbed().setColor("#ff0000").setDescription("<:Rita_Shock:942451387176976426> There's no song to play right now.");
          return interaction.reply({ embeds: [emr] });
        } else if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id == interaction.guild.me.voice.channelId && queue.length != 0) {
          const nmb = interaction.options.getInteger("number");
          console.log(`nmb = ${nmb}`);
          if (nmb == null || nmb == 0) {
            interaction.reply(`<:Rita_Smile:942452006910562354> Skipped **${queue[0][0]}**`);
            queue.splice(0, 1);
            console.log(`queue length = ${queue.length}`);
            if (queue.length != 0) {
              let stream = await play.stream(queue[0][1]);
              const resource = createAudioResource(stream.stream, {
                inputType: stream.type,
              });
              player.play(resource, { seek: 0, volume: 1 });
            } else {
              player.stop();
            }
          } else {
            interaction.reply(`<:Rita_Smile:942452006910562354> Removed **${queue[nmb][0]}**`);
            queue.splice(nmb, 1);
          }
        }
      }

      if (interaction.commandName === "queue") {
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id == interaction.guild.me.voice.channelId) {
          console.table(queue);
          console.log(player.state.status);
        }
      }

      console.log(`Idle Listener: ${player.listenerCount(AudioPlayerStatus.Idle)}`);
      console.log(`Playing Listener: ${player.listenerCount(AudioPlayerStatus.Playing)}`);
      console.log(`player stats = ${player.state.status}`);
    } catch (err) {
      console.log(err);
      interaction.channel.send(`**Sum ting wong:**${err}`);
    }
  },
};
