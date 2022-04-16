const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
Canvas.registerFont('NotoSans-Bold.ttf', { family: 'notosans' });
Canvas.registerFont('texgyreadventor-bold.otf', { family: 'TeXGyreAdventor-Bold' });

module.exports = {
	name: 'guildMemberAdd',
	async execute(interaction, client) {
		console.log(`${interaction.user.username} has joined the server.`);
		const channel = client.channels.cache.get('445719459622027264');
		if (interaction.guild.id == '445717219331276800') {
			const canvas = Canvas.createCanvas(500, 150);
			const context = canvas.getContext('2d');
			const bg = await Canvas.loadImage('./bg.png');
			context.drawImage(bg, 0, 0, canvas.width, canvas.height);
			//
			context.font = '24px TeXGyreAdventor-Bold';
			context.fillStyle = '#000000';
			context.textBaseline = 'top';
			context.fillText('NEW CITIZEN', 147, 15);
			//
			context.font = '30px notosans';
			context.fillStyle = '#FFFFFF';
			context.strokeStyle = 'black';
			context.lineWidth = 2;
			context.strokeText(interaction.user.username, 147, 40);
			context.fillText(interaction.user.username, 147, 40);
			//
			context.strokeText(`#${interaction.user.discriminator}`, 147, 75);
			context.fillText(`#${interaction.user.discriminator}`, 147, 75);
			//
			context.font = '18px TeXGyreAdventor-Bold';
			context.strokeStyle = 'white';
			context.strokeText(`WELCOME TO ${interaction.guild.name}!`, 147, 120);
			context.fillStyle = '#000000';
			context.fillText(`WELCOME TO ${interaction.guild.name}!`, 147, 120);
			//
			const avatar = await Canvas.loadImage(interaction.user.displayAvatarURL({ format: 'png' }));
			context.beginPath();
			context.arc(76, 75, 65, 0, 2 * Math.PI);
			context.closePath();
			context.clip();
			context.drawImage(avatar, 11, 9, 130, 130);
			const attachment = new MessageAttachment(canvas.toBuffer(), 'testtt.png');
			channel.send({ content: `Hi <@${interaction.user.id}>, welcome to ${interaction.guild.name}! Don't forget to check <#886186360371830834> and have a nice day!`, files: [attachment] });
		}
	},
};