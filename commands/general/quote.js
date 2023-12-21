const {SlashCommandBuilder} = require('discord.js');
const {getQuote} = require('../../utility/fetch-quote');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('quote')
    .setDescription('Get a random quote or get a specific one by anime/character name.')
    .addStringOption(option =>
      option.setName('anime').setDescription('Search for quotes by anime name.').setRequired(false)
    )
    .addStringOption(option =>
      option.setName('character').setDescription('Search for quotes by character name.').setRequired(false)
    ),
  async execute(interaction) {
    const isanime = interaction.options.getString('anime');
    const ischaracter = interaction.options.getString('character');
    console.log(isanime);
    console.log(ischaracter);

    //GET RANDOM
    if (!isanime && !ischaracter) {
      const response = await getQuote('random');
      const result = `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      return interaction.reply(result);
    }
    //GET BY ANIME NAME
    if (isanime && !ischaracter) {
      const response = await getQuote(`random/anime?title=${isanime}`);

      if (response.error) {
        await interaction.reply(`No quotes from "${isanime}" are available now !`);
      }

      const animeresult = `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      await interaction.reply(animeresult);
    }
    // GET BY CHARACTER NAME
    if (ischaracter && isanime) {
      const response = await getQuote(`random/character?name=${ischaracter}`);

      if (response.error) {
        await interaction.reply(`No quotes from "${ischaracter}" are available now !`);
      }

      const result = `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      await interaction.reply(result);
    }
    //GET BY ANIME AND CHARACTER NAME
    if (ischaracter && !isanime) {
      const response = await getQuote(`random/character?name=${ischaracter}`);

      if (response.error) {
        await interaction.reply(`No quotes from "${ischaracter}" are available now !`);
      }

      const result = `**Anime:** ${response.anime}
**Character:** ${response.character}
**Quote:** ${response.quote}`;
      await interaction.reply(result);
    }
  },
};
