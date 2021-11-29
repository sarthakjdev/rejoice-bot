const knex = require('../util/knex')
const Guild = require('./guild')

const GUILD_TABLE = 'public.guilds'


class Factory {
    constructor (client){
        this.client = client
    }

    /**
     * Create Guild
     * @param{string} id
     * @param{string} owner
     * @returns{Promise<Guild>}
     */
    async createGuild(id, ownerId) {
        const owner_id = Number(ownerId)
        const [dbGuild] = await knex(GUILD_TABLE).insert({ guildId: id , guildOwnerId: owner_id }).returning('*')
        const guild = new Guild(dbGuild)

        return guild
    }

    /**
     * Get Welcome Channel (if any) 
     * @param {number} guildId 
     * @returns {welcomeChannelId:number}
     */
    async getWelcomeChannel(guildId) {
        const [dbGuild] = await knex(GUILD_TABLE).where({ guildId })
        const guild = new Guild(dbGuild)
        const welcomeChannelId = await guild.welcomeChannel

        return welcomeChannelId
    }

    /**
     * Set Welcome Channel
     * @param {number} guildId 
     * @returns {welcomeChannelId:number}
     */
     async setWelcomeChannel(guildId, welcomeChannelId) {
        const [dbGuild] = await knex(GUILD_TABLE)
        .where({ guildId })
        .update({ welcomeChannelId })
        .returning('*')

        const guild = new Guild(dbGuild)

        return welcomeChannelId
    }

        /**
     * 
     * @param {number} guildId 
     * @returns{Promise<Guild>}
     */
         async getGuild(guildId) {
            const [dbGuild] = await knex(GUILD_TABLE).where({ guildId })
            const guild = new Guild(dbGuild)

            return guild
        }

}

module.exports = Factory