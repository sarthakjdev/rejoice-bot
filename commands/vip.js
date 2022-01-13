const Components = require('../struct/components')

module.exports = {
    adminOnly: true,
    name: 'vip',
    async addVipRole(interaction, client, guild, dbGuild, newRoleId) {
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

        const successEmbed = await Components.successEmbed('Role has been marked as VIP')

        return interaction.editReply(successEmbed)
    },

    async removeVipRole(interaction, client, guild, dbGuild, roleToRemove) {
        const dbVipRoles = dbGuild.vipRoles
        const dbRolesArr = dbVipRoles.split(',')
        if (dbRolesArr.includes(roleToRemove)) {
            const uppdatedRolesArr = dbVipRoles.filter((role) => role !== roleToRemove)
            const rolesToUpdate = uppdatedRolesArr.join()
            await client.factory.setVipRoles(guild.id, rolesToUpdate)

            const successEmbed = await Components.successEmbed('Role has been removed from VIP.')

            await interaction.editReply(successEmbed)
        }
        const errorEmbed = await Components.errorEmbed('The role you are trying to remove is not a VIP role.')

        await interaction.editReply({ embed: [errorEmbed] })
    },

    async getVipRoles(interaction, dbGuild) {
        const vipRoles = dbGuild.vipRoles.split(',')
        const vipRoleComponent = await Components.vipRole(vipRoles)

        return interaction.editReply(vipRoleComponent)
    },

    async clearVipRoles(interaction, client, guild, dbGuild) {
        if (!dbGuild.vipRoles) {
            const errorEmbed = await Components.errorEmbed('No role has been set to vip.')

            await interaction.editReply({ embed: [errorEmbed] })
        }
        const rolesToUpdate = ''

        await client.factory.setVipRoles(guild.id, rolesToUpdate)

        const successEmbed = await Components.successEmbed('You vip role has been resetted.')

        return interaction.editReply(successEmbed)
    },

    async exec(interaction) {
        await interaction.deferReply()
        const { client, guild } = interaction
        const dbGuild = await client.factory.getGuildById(guild.id)

        const actionRole = await interaction.options.get('role')?.value

        switch (interaction.options.getSubcommand()) {
            case 'add-vip':
                return this.addVipRole(interaction, client, guild, dbGuild, actionRole)
            case 'remove-vip':
                return this.removeVipRole(interaction, client, guild, dbGuild, actionRole)
            case 'get-roles':
                return this.getVipRoles(interaction, dbGuild)
            case 'clear':
                return this.clearVipRoles(interaction, client, guild, dbGuild)
            default:
                return 'not implemented'
        }
    },

}
