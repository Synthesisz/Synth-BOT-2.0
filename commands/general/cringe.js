const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
  data: new SlashCommandBuilder().setName('cringe').setDescription('cringe'),
  async execute(interaction) {
    await interaction.reply({
      content: `https://media1.giphy.com/media/28B7EP5TnfHBSXt5Qn/giphy.gif?cid=ecf05e474kmyobefsd2kc3ua5i44y0kitbuyf8im8edyzv1v&rid=giphy.gif&ct=g`,
    });
  },
};
