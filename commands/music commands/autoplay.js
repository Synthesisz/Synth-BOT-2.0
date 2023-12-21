const {CommandInteraction, Client, EmbedBuilder} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('autoplay')
    .setDescription('Enables/disables autoplay for the current queue.'),
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const {member, guild} = interaction;
    const voiceChannel = member.voice.channel;
    const queue = await interaction.client.distube.getQueue(voiceChannel);

    if (!voiceChannel) {
      return interaction.reply({
        content: 'You must be in a voice channel to use music commands.',
        ephemeral: true,
      });
    }

    if (guild.members.me.voice.channelId && voiceChannel.id !== guild.members.me.voice.channelId) {
      return interaction.reply({
        content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`,
        ephemeral: true,
      });
    }

    if (!queue) {
      return interaction.reply({
        content: 'There are no songs in the queue.',
        ephemeral: true,
      });
    }

    // toggle autoplay mode
    queue.toggleAutoplay();
    const autoplayMode = queue.autoplay ? 'enabled' : 'disabled';

    const embed = new EmbedBuilder().setColor('#0099ff').setDescription(`🎵 Autoplay mode is now ${autoplayMode}.`);
    return interaction.reply({embeds: [embed]});
  },
};
