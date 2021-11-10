module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
    let apex = '852723858636800011';
    let genshin = '852724961609252874';
    let osu = '852725050532691999';
    let soulworker = '852725131830624296';
    let csgo = '852725202894979112';
    let gmod = '852725337233424415';
    let lol = '852725466934935563';
    let minkrep = '852725559103586304';
    let arknek = '889334352192888853';
    let honkai = '899522864322060318'; 
    let pgr = '899624944000978955';
    let blueArchive = '905146893062012988';
    let amogus = '758194936498749440';
    const gameRoles = [apex, genshin, osu, soulworker, csgo, gmod, lol, minkrep, arknek, honkai, pgr, blueArchive, amogus];

    if(!interaction.isButton()) return;

    if(interaction.customId === 'btn_reset'){
      interaction.member.roles.remove(gameRoles);
      interaction.reply({content: 'Done 👌', ephemeral: true});
    }

  }
}