const Components = require('../../struct/components')

async function updateUserProfile(interaction, client, guild, dbGuild) {
    if (!dbGuild.profileCommandsChannel) {
        const embed = Components.errorEmbed(`This server has diabled the profile feature.`)

        return interaction.editReply({ embeds: [embed] })
    }

    const dbUserProfile = await client.factory.getUserProfile(interaction.user.id)
    if (!dbUserProfile) {
        const embed = Components.errorEmbed(`You dont have any user profile created yet. Please do craete your profile first.`)

        return interaction.editReply({ embeds: [embed] })
    }

    const { id } = interaction.user
    const name = interaction.options.get('name')?.value
    const description = interaction.options.get('description')?.value
    const twitter = interaction.options.get('twitter')?.value
    const github = interaction.options.get('github')?.value
    const linkedin = interaction.options.get('linkedin')?.value
    const instagram = interaction.options.get('instagram')?.value

    await client.factory.updateUserProfile({
        id, name, description, twitter, github, linkedin, instagram,
    })

    const successEmbed = Components.successEmbed('Your profile has been updated')

    return interaction.editReply(successEmbed)
}

module.exports = updateUserProfile
