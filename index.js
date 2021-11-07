const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const Discord = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]});
const {guildId} = require('./config.json');
const keepAlive = require("./server");
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const Canvas = require('canvas');
const { registerFont } = require('canvas');
registerFont('./texgyreadventor-bold.otf', { family: 'TeXGyreAdventor' });

require('dotenv').config();

client.on("ready", () => client.user.setPresence({activities: [{ name: "NieR:Automata™",type: "PLAYING"}], status: 'online' }));
client.on("ready", () => console.log(`Logged in as ${client.user.tag}`));

client.commands = new Collection();
const commandFiles  = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  if(command.Perms) command.defaultPermission= false;
}

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	client.on(event.name, (...args) => event.execute(...args));
}

/**client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;

	if (interaction.customId === 'roleAssignBtn') {
    const rPick = (`${interaction.values}`);
    console.log(rPick);
  }
});**/

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName); 

  if(!command) return;
  /**
  const fullPermissions = [
	{
		id: '889162700494630933', //ban
		permissions: [{
			id: '447298746548486155',
			type: 'ROLE',
			permission: true,
		},
    {
      id: '480895659793449011',
			type: 'ROLE',
			permission: true,
    }],
	},
	{
		id: '889162700494630941', //kick
		permissions: [{
			id: '447298746548486155',
			type: 'ROLE',
			permission: true,
		},
    {
      id: '480895659793449011',
			type: 'ROLE',
			permission: true,
    }],
	},
  {
    id: '889162700494630935', //clear
    permissions: [{
      id: '447298746548486155',
      type: 'ROLE',
      permission: true,
    },
    {
      id: '480895659793449011',
      type: 'ROLE',
      permission: true,
    }],
  },
  {
    id: '905849092587012096', //addrole
    permissions: [{
      id: '447298746548486155',
      type: 'ROLE',
      permission: true,
    },
    {
      id: '480895659793449011',
      type: 'ROLE',
      permission: true,
    }],
  }
  ];**/
  try{    
    //console.log(interaction.commandName + ' ' + interaction.commandId);
    await command.execute(interaction, client); //DONT DELETE    
    /**await client.guilds.cache.get(guildId)?.commands.permissions.set({ fullPermis sions });**/

  }catch(error){
    console.error(error);
    return interaction.reply({context:'There was an error while executing this command!', ephemeral: true});
  }
});

keepAlive();
client.login(process.env.TOKEN);