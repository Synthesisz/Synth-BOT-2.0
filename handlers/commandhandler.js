// Description: Handles all commands in the commands folder and subfolders.
const fs = require('fs');
const path = require('path');
const {Collection} = require('discord.js');
// const {promisify} = require('util');
// const {glob} = require('glob');
// const PG = promisify(glob);
module.exports = function (client) {
  client.commands = new Collection();
  //console.log(client.commands);
  const foldersPath = path.join(__dirname, '../commands'); // Fix the path to the commands folder
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
};
