const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kerangajaib')
    .addStringOption(option => option.setName('input').setDescription('Masukkan pertanyaanmu.').setRequired(true))
		.setDescription('Tanyakan boleh atau kapan kepada kerang ajaib'),
	async execute(interaction, client) {
    try{
      const pertanyaan = interaction.options.getString('input');
      const kans = ["Ya","Mungkin Iya","Coba Lagi","Mungkin Tidak","Tidak", "YNTKTS","YTBJTS","KKTBSYS"];
      const kaps = ["Sekarang","Nanti","Satu jam lagi","Besok","Besok Lusa", "1 minggu", "1 bulan","1 tahun kemudian","YNTKTS","YTBJTS","KKTBSYS"];
      const choice = kans[Math.floor(Math.random() * kans.length)];
      const choice2 = kaps[Math.floor(Math.random() * kaps.length)];
      if(pertanyaan.includes("kapan" || "Kapan")){
        return interaction.reply(`**Pertanyaan: **${pertanyaan}\n**Jawaban: **${choice2}`);
      }else if(pertanyaan.includes("gimana" || "Gimana" || "Bagaimana" || "bagaimana" || "Gmn" || "gmn")){
        return interaction.reply({content : "Yo ndak tau, coba tanya google", ephemeral: true});
      }else if(pertanyaan.includes("anime")){
        return interaction.reply(`**Pertanyaan: **${pertanyaan}\n**Jawaban: **${choice}\n**IH WIBU!**`);
      }else{
        return interaction.reply(`**Pertanyaan: **${pertanyaan}\n**Jawaban: **${choice}`);
      }
    }catch(err){
      console.log("Something wrong i can feel it |",err);
    }
	},
};