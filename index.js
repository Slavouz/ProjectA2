const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
const keepAlive = require("./server");

require('dotenv').config();

client.on("ready", () => client.user.setPresence({activities: [{ name: 'himself getting developed',type: "WATCHING"}], status: 'online' }));
client.on("ready", () => console.log(`Logged in as ${client.user.tag}`));

client.commands = new Collection();
const commandFiles  = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  if(command.Perms) command.defaultPermission= false;
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if(!command) return;

  try{
    await command.execute(interaction, client);
  }catch(error){
    console.error(error);
    return interaction.reply({context:'There was an error while executing this command!', ephemeral: true});
  }
});

keepAlive();
client.login(process.env.TOKEN);