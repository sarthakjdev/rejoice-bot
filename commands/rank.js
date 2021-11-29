module.exports = {
    name: 'rank',
    exec: async(interaction) => {
        const { client } = interaction
        await interaction.deferReply()

        await interaction.editReply('This command will have all the subcommand related to ranking system')
    }
}