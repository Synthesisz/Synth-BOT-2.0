const {SlashCommandBuilder} = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Get the current weather for a specified location')
    .addStringOption(option =>
      option.setName('location').setDescription('The location to get the weather for').setRequired(true)
    ),
  async execute(interaction) {
    const location = interaction.options.getString('location');

    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: location,
          appid: 'f35415ad1cddd140be8124e98ec07c7a',
          units: 'metric',
        },
      });

      const weatherData = response.data;
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;

      await interaction.reply(
        `The current weather in ${location} is ${description} with a temperature of ${temperature}°C.`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply('Failed to fetch weather data.');
    }
  },
};
