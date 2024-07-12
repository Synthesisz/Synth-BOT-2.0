const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('dc')
    .setDescription('Disconnects the bot from the voice channel and stops the music.'),

  async execute(interaction) {
    const { client, guild } = interaction;
    const queue = client.distube.getQueue(interaction.guildId);
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: 'You must be in a voice channel to be able to use music commands.',
        ephemeral: true,
      });
    }
    if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId) {
      return interaction.reply({
        content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`,
        ephemeral: true,
      });
    }
    try {
      queue.stop();
      await queue.voice.leave();
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription('⏹ **Stopped The Music & Left The Voice Channel.**'),
        ],
      });
    } catch (e) {
      const errorEmbed = new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  },
};

// const { SlashCommandBuilder } = require('@discordjs/builders');
// const { EmbedBuilder } = require('discord.js');

// module.exports = {
//   data: new SlashCommandBuilder().setName('disconnect').setDescription('Disconnects the bot.'),

//   async execute(interaction) {
//     const { client, member, guild } = interaction;
//     const voiceChannel = member.voice.channel;
//     const queue = client.distube.getQueue(guild.id);

//     if (!voiceChannel) {
//       return interaction.reply({
//         content: 'You must be in a voice channel to be able to use music commands.',
//         ephemeral: true,
//       });
//     }

//     if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId) {
//       return interaction.reply({
//         content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`,
//         ephemeral: true,
//       });
//     }

//     try {
//       await queue.voice.leave();
//       return interaction.reply({
//         embeds: [
//           new EmbedBuilder()
//             .setColor('#0099ff')
//             .setDescription('⏹ **Stopped The Music & Left The Voice Channel.**'),
//         ],
//       });
//     } catch (e) {
//       const errorEmbed = new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 Alert: ${e}`);
//       return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
//     }
//   },
// };
