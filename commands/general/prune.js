const {SlashCommandBuilder} = require('@discordjs/builders');
const {PermissionsBitField} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('prune')
    .setDescription('Deletes between 1 and 100 messages')
    .addIntegerOption(option =>
      option.setName('amount').setDescription('The number of messages to delete').setRequired(true)
    )
    .addUserOption(option =>
      option.setName('target').setDescription('The user whose messages to delete').setRequired(false)
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    const target = interaction.options.getUser('target');
    const messages = await interaction.channel.messages.fetch();

    // Check if the user has the manage_messages permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({content: 'You do not have permission to use this command.', ephemeral: true});
    }

    if (amount < 1 || amount > 100) {
      return interaction.reply({content: 'Please provide a number between 1 and 100.', ephemeral: true});
    }

    if (!target) {
      await interaction.channel.bulkDelete(amount, true).catch(error => {
        console.error(error);
        interaction.reply({
          content: 'There was an error trying to prune messages in this channel!',
          ephemeral: true,
        });
      });
      return interaction.reply({
        content: `Successfully pruned \`${amount}\` messages.`,
        ephemeral: true,
      });
    } else {
      let i = 0;
      const filtered = [];
      (await messages).filter(m => {
        if (m.author.id === target.id && amount > i) {
          filtered.push(m);
          i++;
        }
      });
      await interaction.channel.bulkDelete(filtered, true);
      return interaction.reply({
        content: `Successfully pruned \`${amount}\` messages from ${target}.`,
        ephemeral: true,
      });
    }
  },
};
