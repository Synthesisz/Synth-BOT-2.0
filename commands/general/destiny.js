const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = {
  data: new SlashCommandBuilder().setName('destiny').setDescription('Illidan'),
  async execute(interaction) {
    await interaction.reply({
      content: `https://media1.giphy.com/media/5K5HBMbu6rFyFnhXEO/giphy.gif?cid=790b7611eb94d0906c36a5f90d06c755cea6e33de042f085&rid=giphy.gif&ct=g`,
    });
  },
};
