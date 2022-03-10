/**
 * interactionCreate event of the rejoice discord bot, trigerred when a new interaction is created
 */

const { errorEmbed } = require('../struct/components')

module.exports = async (client, interaction) => {
    if (!interaction.isCommand()) return
    const command = client.slashCommands.get(interaction.commandName)
    if (command) {
        try {
            const isAdmin = await interaction.member.permissions.has('ADMINISTRATOR')
            if (command.adminOnly && !isAdmin) {
                const embed = errorEmbed('You\'re not allowed to use this command')
                await interaction.reply({ embeds: [embed] })
            } else {
                await command.exec(interaction)
            }
        } catch (err) {
            client.util.errorPrint(err, { description: `command error :: ${interaction.commandName} | ${interaction.guild.name} | ${interaction.channel.name} | ${interaction.user.tag}` })
        }
    }
}
