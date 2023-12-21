const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('skip').setDescription('Skips the current song.'),
  async execute(interaction) {
    const {member, guild} = interaction;
    const voiceChannel = member.voice.channel;
    const queue = interaction.client.distube.getQueue(guild.id);

    if (!voiceChannel)
      return interaction.reply({
        content: 'You must be in a voice channel to use music commands.',
        ephemeral: true,
      });

    if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId)
      return interaction.reply({
        content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`,
        ephemeral: true,
      });

    try {
      const autoplayMode = queue.autoplay;

      if (queue.songs.length <= 1 && autoplayMode) {
        queue.skip();
      } else if (queue.songs.length === 1 && !autoplayMode) {
        queue.stop();
      } else {
        queue.skip();
      }

      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#0099ff').setDescription(`⏯ **Song Skipped.**`)],
      });
    } catch (e) {
      const errorEmbed = new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
