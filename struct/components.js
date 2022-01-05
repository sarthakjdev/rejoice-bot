const { MessageEmbed } = require('discord.js')
const Util = require('../util/util')

const color = process.env.COLOR

class Components {
    // owner info component:
    static ownerInfo(owner) {
        const ownerInfoComponent = new MessageEmbed()
            .setAuthor('Rejoice Bot', `${process.env.THUMBNAIL}`)
            .setColor(color)
            .setThumbnail(process.env.THUMBNAIL)
            .addField('Owner:', `<@${owner.user.id}>`)
            .addField('Owner Name:', `${owner.user.username}`)
            .addField('Owner Discrimintor:', `${owner.user.discriminator}`)

        return {
            embeds: [ownerInfoComponent],
        }
    }

    // server info component:
    static serverInfo(guild, owner) {
        const adminInfoComponent = new MessageEmbed()
            .setAuthor('Rejoice Bot', `${process.env.THUMBNAIL}`)
            .setColor(color)
            .setThumbnail(process.env.THUMBNAIL)
            .addField('Server:', `${guild.name}`)
            .addField('Server ID:', `${guild.id}`)
            .addField('Server Created at:', `${new Date(guild.joinedTimestamp)}`)
            .addField('Owner Name:', `${owner.user.username}`)
            .addField('Members:', `${guild.memberCount}`)

        return {
            embeds: [adminInfoComponent],
        }
    }

    static vipRole(roles) {
        const vipRoleComponent = new MessageEmbed()
            .setAuthor('Rejoice Bot', `${process.env.THUMBNAIL}`)
            .setColor(color)
            .setThumbnail(process.env.THUMBNAIL)
            .addField('VIP Roles', `${roles.map((role) => `<@${role}>`).join(`\n`)}`, true)

        return {
            embeds: [vipRoleComponent],
        }
    }

    // success component:
    static successEmbed(message) {
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription(`<:R_verify:915678098782052363> **${message}**`)

        return {
            embeds: [embed],
        }
    }

    // error component:
    static errorEmbed(message) {
        return Util.embed().setDescription(`<:R_cross:915678807367757824> **${message}**`)
    }

    static leaderboard(users) {
        const leaderboard = new MessageEmbed()
            .setAuthor('Rejoice Bot', `${process.env.THUMBNAIL}`)
            .setColor(color)
            .setThumbnail(process.env.THUMBNAIL)
            .setDescription(`**Leaderboard containing top 10 rankers of the guild**`)
            .addField('RANK', `${Array.from({ length: users.length }, (y, x) => `\`${x + 1}\``).join(`\n`)}`, true)
            .addField('USERS', `${users.map((user) => `<@${user.id}>`).join(`\n`)}`, true)

        return {
            embeds: [leaderboard],
        }
    }
}

module.exports = Components
