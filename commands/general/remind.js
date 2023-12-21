const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder for a specific duration')
    .addStringOption(option =>
      option.setName('minutes').setDescription('Number of minutes for the reminder').setRequired(true)
    )
    .addStringOption(option =>
      option.setName('hours').setDescription('Number of hours for the reminder').setRequired(false)
    )
    .addStringOption(option => option.setName('about').setDescription('What the reminder is about').setRequired(false)),
  async execute(interaction) {
    const minutesOption = interaction.options.getString('minutes');
    const hoursOption = interaction.options.getString('hours');
    const aboutOption = interaction.options.getString('about');
    const minutes = parseInt(minutesOption);
    const hours = hoursOption ? parseInt(hoursOption) : 0;

    if (isNaN(minutes) || (hoursOption && isNaN(hours))) {
      return interaction.reply('Please provide valid numbers for minutes and/or hours.');
    }

    const totalMinutes = minutes + hours * 60;
    const reminderTimestamp = Math.floor((Date.now() + totalMinutes * 60000) / 1000);
    let reminderMessage;
    if (aboutOption) {
      reminderMessage = `I will remind you about **${aboutOption}** <t:${reminderTimestamp}:R>.`;
    } else {
      reminderMessage = `I will remind you <t:${reminderTimestamp}:R>.`;
    }
    // Create an embed for the initial reply
    const embed = new EmbedBuilder().setColor('#0099ff').setTitle('Reminder Set!').setDescription(reminderMessage);

    // Send the initial reply with the embed
    await interaction.reply({embeds: [embed]});

    // Set a timeout to send the reminder
    setTimeout(() => {
      if (aboutOption) {
        interaction.followUp(`Hey ${interaction.user}, I'm reminding you about **${aboutOption}**`);
      } else {
        interaction.followUp(`Hey ${interaction.user}, your reminder is up!`);
      }
    }, totalMinutes * 60000);
  },
};
