const Components = require('../../struct/components')

async function addVipRole(interaction, client, guild, dbGuild, newRoleId) {
    const dbVipRoles = dbGuild.vipRoles
    let dbRolesArr
    if (dbVipRoles) dbRolesArr = dbVipRoles.split(',')
    else dbRolesArr = []
    if (dbRolesArr.includes(newRoleId)) {
        const errorEmbed = Components.errorEmbed('Role has already been marked as VIP')

        return interaction.editReply({ embeds: [errorEmbed] })
    }
    if (dbRolesArr.length === 5) {
        const errorEmbed = Components.errorEmbed('You already have 5 roles marked as VIP roles, you can not add more role as VIP role.')

        return interaction.editReply({ embeds: [errorEmbed] })
    }
    const roleToInsert = newRoleId
    await client.factory.setVipRoles(guild.id, roleToInsert)

    const successEmbed = Components.successEmbed('Role has been marked as VIP')

    return interaction.editReply(successEmbed)
}

async function removeVipRole(interaction, client, guild, dbGuild, roleToRemove) {
    const dbVipRoles = dbGuild.vipRoles
    let dbRolesArr
    if (dbVipRoles) dbRolesArr = dbVipRoles.split(',')
    if (!dbVipRoles || dbVipRoles === '') {
        const errorEmbed = Components.errorEmbed('No vip role set up to remove')

        return interaction.editReply({ embeds: [errorEmbed] })
    }
    if (dbRolesArr && dbRolesArr.length === 1) {
        await client.factory.clearVipRoles(guild.id)
        dbRolesArr = []
        const successEmbed = Components.successEmbed('Role has been removed from VIP.')

        return interaction.editReply(successEmbed)
    }

    if (dbRolesArr && dbRolesArr.includes(roleToRemove)) {
        const updatedRolesArr = dbRolesArr.filter((role) => role !== roleToRemove)
        const rolesToUpdate = updatedRolesArr.join()
        await client.factory.removeVipRole(guild.id, rolesToUpdate)

        const successEmbed = Components.successEmbed('Role has been removed from VIP.')

        return interaction.editReply(successEmbed)
    }
    const errorEmbed = Components.errorEmbed('The role you are trying to remove is not a VIP role.')

    return interaction.editReply({ embeds: [errorEmbed] })
}

async function getVipRoles(interaction, dbGuild) {
    const vipRoles = dbGuild.vipRoles.split(',')
    const vipRoleComponent = Components.vipRole(vipRoles)

    return interaction.editReply(vipRoleComponent)
}

async function clearVipRoles(interaction, client, guild, dbGuild) {
    if (!dbGuild.vipRoles) {
        const errorEmbed = Components.errorEmbed('No role has been set to vip.')

        return interaction.editReply({ embeds: [errorEmbed] })
    }

    await client.factory.clearVipRoles(guild.id)

    const successEmbed = Components.successEmbed('You vip role has been resetted.')

    return interaction.editReply(successEmbed)
}

module.exports = {
    addVipRole,
    removeVipRole,
    getVipRoles,
    clearVipRoles,
}
