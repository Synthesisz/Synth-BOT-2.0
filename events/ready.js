// Desc: Event that is triggered when the bot is ready
const {Events, ActivityType} = require('discord.js');
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity('Demon Hunter', {type: ActivityType.PLAYING});
  },
};
