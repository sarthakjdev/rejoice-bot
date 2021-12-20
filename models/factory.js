const Components = require("../struct/components");
const knex = require("../util/knex");
const Guild = require("./guild");
const User = require("./user");
const GUILD_TABLE = "public.guilds";
const USER_TABLE = "public.users";

class Factory {
  constructor(client) {
    this.client = client;
  }

  /**
   * Create Guild
   * @param{string} id
   * @param{string} owner
   * @returns{Promise<Guild>}
   */
  async createGuild(id, ownerId) {
    const [dbGuild] = await knex(GUILD_TABLE)
      .insert({ guildId: id, guildOwnerId: ownerId })
      .returning("*");
    const guild = new Guild(dbGuild);

    return guild;
  }

  /**
   * Delete Guild
   * @param{string} id
   */
  async deleteGuild(id) {
    await knex(GUILD_TABLE).where({ guildId: id }).del();
  }

  /**
   * Get Welcome Channel (if any)
   * @param {number} guildId
   * @returns {number} welcomeChanelId | undefined
   */
  async getWelcomeChannel(guildId) {
    const guild = await this.getGuildById(guildId);
    const welcomeChannelId = await guild.welcomeChannel;

    return welcomeChannelId;
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
      .returning("*");
    const guild = new Guild(dbGuild);

    return guild;
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
      .returning("*");
    const guild = new Guild(dbGuild);

    return guild;
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
      .returning("*");
    const guild = new Guild(dbGuild);

    return guild;
  }

  /**
   * Get db guild by Id
   * @param {number} guildId
   * @returns{Promise<Guild>}
   */
  async getGuildById(guildId) {
    const [dbGuild] = await knex(GUILD_TABLE).where({ guildId });
    if (!dbGuild) console.log("No guild found in the db.");
    const guild = new Guild(dbGuild);

    return guild;
  }

  /**
   * Enable / disable ranking system
   * @param {number} guildId
   * @param {boolean} rankingStatus
   * @returns {Promise<Guild>}
   */
  async updateRankingStatus(guildId, rankingStatus) {
 console.log("guildId ", guildId);
    const [dbGuild] = await knex(GUILD_TABLE)
      .where({ guildId })
      .update({ rankingStatus })

    const guild = new Guild(dbGuild);

    return guild;
  }

  /**
   * Getting the user
   * @param {string} guildId
   * @param {string} userId
   * @returns {Promise<User>}
   */
  async getUser(guildId, userId) {
    const [dbUser] = await knex(USER_TABLE).where({ guildId, userId });
    if (!dbUser) return undefined
    const user = new User(dbUser);

    return user;
  }

  /**
   * Creating user
   * @param {string} guildId 
   * @param {string} userId 
   * @returns {Promise<User>}
   */
  async createUser(guildId, userId){
    const [dbUser] = await knex(USER_TABLE)
    .insert({ guildId, userId })
    .returning('*')

    const user = new User(dbUser)

    return user;
  }

  /**
   * Updating the user's rank
   * @param {string} guildId
   * @param {string} userId
   * @param {string} pointsToUpdate
   * @returns {Promise<User>}
   */
  async updatePoints(guildId, userId, pointsToUpdate) {
    const [dbUser] = await knex(USER_TABLE)
      .where({ guildId, userId })
      .update({ points: pointsToUpdate })
      .returning("*");
    const user = new User(dbUser);
    return user;
  }

   /**
   * Updating the user's rank
   * @param {string} guildId
   * @param {string} pointsToUpdate
   * @returns {Promise<User>}
   */
     async resetRanking(guildId) {
        const [dbUser] = await knex(USER_TABLE)
          .where({ guildId })
          .update({ points: 0 })
          .returning("*");

           return 
      }

     /**
      * Get leaderboard
     * @param {string} guildId 
     * @returns {Promise<any[]>}
     */
    async getLeaderboard(guildId) {
      const dbUsers = await knex(USER_TABLE)
      .where({ guildId })
      .orderBy('points','desc')
      .limit(10)
      
      const users = dbUsers.map((u)=> new User(u))

      return users;
    }

    /**
     * setting or adding vip roles
     * @param {string} guildId 
     * @param {string} vipRolesId 
     */
    async setVipRoles(guildId, roleId){
      const guildToUpdate = await this.getGuildById(guildId)
      const existingVipRoles = guildToUpdate.vipRoles
      let vipRolesToInsert 
      if(!existingVipRoles) vipRolesToInsert = roleId
      else vipRolesToInsert = `${existingVipRoles},${roleId}`

      const [dbGuild] = await knex(GUILD_TABLE)
      .where({ guildId })
      .update({ vipRoles: vipRolesToInsert })
      .returning('*')

      const guild = new Guild(dbGuild)

      return guild
    }
}

module.exports = Factory;
