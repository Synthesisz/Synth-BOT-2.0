const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('stop').setDescription('Stops the music and clears the queue.'),
  async execute(interaction) {
    const {member, guild} = interaction;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({
        content: 'You must be in a voice channel to use this command.',
        ephemeral: true,
      });
    }

    const queue = interaction.client.distube.getQueue(guild.id);

    if (!queue) {
      return interaction.reply({
        content: 'There is no queue to stop.',
        ephemeral: true,
      });
    }

    if (guild.members.me.voice.channelId !== voiceChannel.id) {
      return interaction.reply({
        content: `I am not in your voice channel.`,
        ephemeral: true,
      });
    }

    try {
      queue.stop();
      queue.songs = []; // Clear the queue
      interaction.reply({
        embeds: [new EmbedBuilder().setColor('#0099ff').setDescription(`⏹ **Music stopped and queue cleared.**`)],
      });
    } catch (error) {
      console.error('Error stopping music:', error);
      interaction.reply({
        content: 'An error occurred while trying to stop the music.',
        ephemeral: true,
      });
    }
  },
};
