const {SlashCommandBuilder} = require('@discordjs/builders');
const {EmbedBuilder} = require('discord.js');
const {CommandInteraction, Client} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song.')
    .addStringOption(option => option.setName('query').setDescription('Provide a name or URL').setRequired(true)),
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const {member, guild, channel} = interaction;
    const VoiceChannel = member.voice.channel;
    //const permissions = VoiceChannel.joinable;
    if (!VoiceChannel) {
      return interaction.reply({
        content: 'You must be in a voice channel to be able to use music commands.',
        ephemeral: true,
      });
    }
    if (!VoiceChannel.joinable) {
      return interaction.reply({
        content: `I dont have permission to join this channel.`,
        ephemeral: true,
      });
    }
    if (guild.members.me.voice.channelId && VoiceChannel.id !== guild.members.me.voice.channelId) {
      return interaction.reply({
        content: `I am already playing music in <#${guild.members.me.voice.channelId}>.`,
        ephemeral: true,
      });
    }

    try {
      interaction.client.distube.play(VoiceChannel, interaction.options.getString('query'), {
        textChannel: channel,
        member: member,
      });
      return interaction.reply({
        embeds: [new EmbedBuilder().setColor('#0099ff').setDescription(`☑ **Request received.**`)],
      });
    } catch (e) {
      const errorEmbed = new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 Alert: ${e}`);
      return interaction.reply({embeds: [errorEmbed], ephemeral: true});
    }
  },
};
