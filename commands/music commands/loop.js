const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('loop').setDescription('Loops the music.'),
  async execute(interaction, client) {
    const {member, guild, channel} = interaction;
    const voiceChannel = member.voice.channel;
    const queue = await interaction.client.distube.getQueue(voiceChannel);

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
      let mode = await interaction.client.distube.setRepeatMode(queue);

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#0099ff')
            .setDescription(`🔁 **Repeat Mode is set to: ${(mode = mode ? (mode == 2 ? 'Queue' : 'Song') : 'Off')}**`),
        ],
      });
    } catch (e) {
      const errorEmbed = new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
