const Components = require('../../struct/components')

async function deleteUserProfile(interaction, client, guild, dbGuild) {
    if (!dbGuild.profileCommandsChannel) {
        const embed = Components.errorEmbed(`This server has diabled the profile feature.`)

        return interaction.editReply({ embeds: [embed] })
    }
    const { id } = interaction.user

    await client.factory.deleteUserProfile({ id })

    const successEmbed = Components.successEmbed('Your profile has been deleted succesfully')

    return interaction.editReply(successEmbed)
}

module.exports = deleteUserProfile
