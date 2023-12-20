const {EmbedBuilder} = require('discord.js');
async function DistubeEvents(client) {
  client.distube
    .on('playSong', (queue, song) =>
      queue.textChannel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('#57F287')
            .setDescription(
              `🎵 | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
            ),
        ],
      })
    )

    .on('addSong', (queue, song) =>
      queue.textChannel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`🎵| Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`),
        ],
      })
    )

    .on('addList', (queue, playlist) =>
      queue.textChannel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`🎵 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`),
        ],
      })
    )
    // DisTubeOptions.searchSongs = true

    .on('error', (channel, e) => {
      if (channel)
        channel.send({embeds: [new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 | An error occured: ${e}`)]});
      else console.error(e);
    })
    .on('empty', queue =>
      queue.textChannel.send({
        embeds: [
          new EmbedBuilder().setColor('#ED4245').setDescription('Voice channel is empty! Leaving the channel...'),
        ],
      })
    )

    .on('searchNoResult', message =>
      message.channel.send({
        embeds: [new EmbedBuilder().setColor('#ED4245').setDescription(`🔴 | No result found!`)],
      })
    )
    .on('finish', queue =>
      queue.textChannel.send({
        embeds: [new EmbedBuilder().setColor('#ED4245').setDescription('Queue finished.')],
      })
    );
}
module.exports = DistubeEvents;
