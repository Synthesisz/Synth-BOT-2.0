const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('pause').setDescription('Pauses the music.'),

  async execute(interaction) {
    const {member, guild} = interaction;
    const voiceChannel = member.voice.channel;
    const queue = interaction.client.distube.getQueue(guild.id);

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
      await queue.pause();
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#0099ff').setDescription('⏸ **Song Paused.**')],
      });
    } catch (e) {
      const errorEmbed = new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
