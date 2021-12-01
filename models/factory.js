const Components = require('../struct/components')
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
        const [dbGuild] = await knex(GUILD_TABLE).insert({ guildId: id , guildOwnerId: ownerId }).returning('*')
        const guild = new Guild(dbGuild)

        return guild
    }

    /**
     * Delete Guild
     * @param{string} id
     */
    async deleteGuild(id) {
        await knex(GUILD_TABLE).where({ guildId: id }).del()
    }

    /**
     * Get Welcome Channel (if any) 
     * @param {number} guildId 
     * @returns {number} welcomeChanelId | undefined
     */
    async getWelcomeChannel(guildId) {
        const guild = await this.getGuildById(guildId)
        const welcomeChannelId = await guild.welcomeChannel

        return welcomeChannelId
    }

    /**
     * Set Welcome Channel
     * @param {number} guildId 
     * @param {number} welcomeChannelId
     * @returns{Promise<Guild>}
     */
     async setWelcomeService(guildId, welcomeChannelId, wTimeSpan) {
        const [dbGuild] = await knex(GUILD_TABLE)
        .where({ guildId })
        .update({ welcomeChannelId, wTimeSpan })
        .returning('*')
        const guild = new Guild(dbGuild)

        return guild
    }

    /**
     * Set Welcome Channel
     * @param {number} guildId 
     * @param {number} wTimeSpan
     * @returns{Promise<Guild>}
     */
     async updateWelcomeChannel(guildId, welcomeChanelId) {
        const [dbGuild] = await knex(GUILD_TABLE)
        .where({ guildId })
        .update({ welcomeChannelId })
        .returning('*')
        const guild = new Guild(dbGuild)

        return guild
    }

     /**
     * Set Welcome Channel
     * @param {number} guildId 
     * @param {number} wTimeSpan
     * @returns{Promise<Guild>}
     */
         async updateTime(guildId, wTimeSpan) {
            const [dbGuild] = await knex(GUILD_TABLE)
            .where({ guildId })
            .update({ wTimeSpan })
            .returning('*')
            const guild = new Guild(dbGuild)
    
            return guild
        }

    /**
     * Get db guild by Id
     * @param {number} guildId 
     * @returns{Promise<Guild>}
     */
         async getGuildById(guildId) {
            const [dbGuild] = await knex(GUILD_TABLE).where({ guildId })
            if(!dbGuild) console.log('No guild found in the db.');
            const guild = new Guild(dbGuild)

            return guild
        }
}

module.exports = Factory