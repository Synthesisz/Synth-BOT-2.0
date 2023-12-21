const {SlashCommandBuilder} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the avatar picture of a member')
    .addUserOption(option =>
      option.setName('member').setDescription('The member whose avatar you want to retrieve').setRequired(true)
    ),
  async execute(interaction) {
    const member = interaction.options.getMember('member');
    const avatarUrl = member.user.displayAvatarURL({dynamic: true, format: 'png', size: 4096});

    await interaction.reply({content: avatarUrl});
  },
};
