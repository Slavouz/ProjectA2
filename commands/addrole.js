const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
    .addChannelOption(option => option.setName('channel').setDescription('Set channel').setRequired(true))
		.setDescription('Tambah role')
    .setDefaultPermission(false),
	async execute(interaction, client) {
    if(interaction.member.permissions.has(["ADMINISTRATOR"])){
      const canel = interaction.options.getChannel('channel');
      
      const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('roleAssignBtn')
					.setPlaceholder('Klik disini')
          .setMinValues(1)
					.setMaxValues(13)
					.addOptions([
						{
              emoji: '<:OSU:604997343502270484>',
							label: 'Osu!',
							description: 'for Osu! players',
							value: 'chk_osu',
						},
						{
              emoji: '<:SoulWorker:852540365381828659>',
							label: 'Soulworker',
							description: 'for Soulworker players',
							value: 'chk_soulworker',
						},
            {
              emoji: '<:Minecraft:480243633413554206>',
							label: 'Minecraft',
							description: 'for Minecraft players',
							value: 'chk_minecraft',
						},
            {
              emoji: '<:LeagueOfLegends:852539457231126549>',
							label: 'League of Legends',
							description: 'for League of Legends players',
							value: 'chk_lol',
						},
            {
              emoji: '<:GmodLogo:599564505441370133>',
							label: "Garry's Mod",
							description: "for Garry's Mod players",
							value: 'chk_gmod',
						},
            {
              emoji: '<:Genshin:852540799257149440>',
							label: "Genshin Impact",
							description: "for Genshin Impact players",
							value: 'chk_genshin',
						},
            {
              emoji: '<:counterstrikeglobaloffensivecsgo:852540237171130388>',
							label: "Counter Strike: Global Offensive",
							description: "for CS:GO players",
							value: 'chk_csgo',
						},
            {
              emoji: '<:SUS_Blue:758197833848848384>',
							label: "Among Us",
							description: "for Among Us players",
							value: 'chk_amogus',
						},
            {
              emoji: '<:ApexLegends:852537962494427176>',
							label: "Apex Legends",
							description: "for Apex Legends players",
							value: 'chk_apex',
						},
            {
              emoji: '<:arkenek:889340927347417148>',
							label: "Arknights",
							description: "for Arknights players",
							value: 'chk_arknek',
						},
            {
              emoji: '<:honkai:899522162661150720>',
							label: "Honkai Impact 3rd",
							description: "for Honkai Impact 3rd players",
							value: 'chk_honkai',
						},
            {
              emoji: '<:PGR:899624545756016670>',
							label: "Punishing: Gray Raven",
							description: "for P:GR players",
							value: 'chk_pgr',
						},
            {
              emoji: '<:blue_archive:864721297099194398>',
							label: "Blue Archive",
							description: "for Blue Archive players",
							value: 'chk_ba',
						},
					]),
			);
      
      const row2 = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('btn_reset')
            .setLabel('RESET')
            .setStyle('DANGER'),
        );

      const embed = new MessageEmbed()
      .setColor('1155FF')
      .setTitle("Ambil role disini")
      .setDescription("Silakan ambil role yang ada di bawah ini")
      .setImage("https://cdn.discordapp.com/attachments/733371190152003634/905817571729768468/PICK_YOUR_ROLES_h2ere.png");

		  canel.send({embeds: [embed], components: [row, row2] });
      return interaction.reply({content: "Done(?)", ephemeral: true});
      
    }else{
      return interaction.reply({content: "Tidak semudah itu ferguso", ephemeral: true});
    }
	},
};