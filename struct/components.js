const { MessageActionRow, MessageButton , MessageEmbed } = require('discord.js')
const Util = require('../util/util')
const color = process.env.COLOR


class Components {

    static ownerInfo(owner){
        const ownerInfoComponent = new MessageEmbed()
        .setAuthor('Rejoice Bot', `${process.env.THUMBNAIL}`)
        .setColor(color)
        .setThumbnail(process.env.THUMBNAIL)
        .addField('Owner:', `<@${owner.user.id}>`)
        .addField('Owner Name:', `${owner.user.username}`)
        .addField('Owner Discrimintor:', `${owner.user.discriminator}`)

        return {
            embeds: [ownerInfoComponent]
        }
    }

    static serverInfo(guild, owner){
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
            embeds: [adminInfoComponent]
        }
    }

    static successEmbed(message) {
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`<:R_right:894842773197434921> **${message}**`)

        return {
            embeds: [embed]
        }
    }

    static errorEmbed(message) {
        return Util.embed().setDescription(`:x: **${message}**`)
    }
}

module.exports = Components