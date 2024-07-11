const {Client, GatewayIntentBits, Collection} = require('discord.js');
const {token} = require('./config.json');
const commandHandler = require('./handlers/commandhandler');
const eventHandler = require('./handlers/eventhandler');
const {DisTube} = require('distube'); //
const {SpotifyPlugin} = require('@distube/spotify');
const {SoundCloudPlugin} = require('@distube/soundcloud');
const {YtDlpPlugin} = require('@distube/yt-dlp');
const deployCommands = require('./deployOG.js');
const DistubeEvents = require('./DistubeEvents.js');
const pathToFfmpeg = require('./node_modules/ffmpeg-static/');
deployCommands();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    // Add more intents as needed
  ],
});
client.commands = new Collection();

commandHandler(client);
eventHandler(client);
//Distube

client.distube = new DisTube(client, {
  emitAddSongWhenCreatingQueue: false,
  leaveOnEmpty: true,
  ffmpeg: {
    path: pathToFfmpeg,
  },
  leaveOnStop: false,
  nsfw: true,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin()],
});
module.exports = client; //END OF DISTUBE
DistubeEvents(client);
client.login(your token here); 
