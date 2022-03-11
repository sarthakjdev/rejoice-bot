module.exports = [
    {
        name: 'ping',
        description: 'shows the ping',
    },
    {
        name: 'welcome',
        description: 'welcome commands start or stop',
        options: [
            {
                name: 'enable',
                description: 'start the welcome of the server member',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'channel to welcome',
                        type: 'CHANNEL',
                        channel_type: 'GUILD_TEXT',
                        required: true,
                    },
                    {
                        name: 'time',
                        description: 'time frame for a message to disappear in seconds',
                        type: 'NUMBER',
                    },
                ],
            },
            {
                name: 'disable',
                description: 'stop the welcoming of the server member',
                type: 1,
            },
            {
                name: 'set-channel',
                description: 'set up a channel for welcome messages',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'channel for welcome messages',
                        type: 'CHANNEL',
                        required: true,
                    },
                ],
            },
            {
                name: 'set-time',
                description: 'set up time for welcome messages to disappear',
                type: 1,
                options: [
                    {
                        name: 'time',
                        description: 'time in seconds',
                        type: 'NUMBER',
                        required: true,
                    },
                ],
            },
            {
                name: 'set-embed',
                description: 'set up welcome embed for the server',
                type: 1,
                options: [
                    {
                        name: 'color',
                        type: 'STRING',
                        description: 'color of the embed',
                    },
                    {
                        name: 'title',
                        description: 'title of the embed',
                        type: 'STRING',
                    },
                    {
                        name: 'description',
                        description: 'description of the embed',
                        type: 'STRING',
                    },
                    {
                        name: 'thumbnail-link',
                        description: 'thumbnail link of the embed',
                        type: 'STRING',
                    },
                    {
                        name: 'banner-link',
                        description: 'banner link of the embed',
                        type: 'STRING',
                    },
                ],
            },
            {
                name: 'test',
                description: 'to test the current welcoem embed for the server',
                type: 1,
            },
        ],
    },
    {
        name: 'admin-info',
        description: 'provides information about the server admins',
    },
    {
        name: 'test',
        description: 'for testing purpose',
    },
    {
        name: 'server-info',
        description: 'provides information about the server',
    },
    {
        name: 'rank',
        description: 'provides ranking utility',
        options: [
            {
                name: 'enable',
                description: 'setting up bot to start the ranking of the user',
                type: 1,
            },
            {
                name: 'disable',
                description: 'disables the ranking system but sustains the rank points',
                type: 1,
            },
            {
                name: 'reset',
                description: 'reset the ranking for the guild, it will clear te rank of everyuser to zero',
                type: 1,
            },
            {
                name: 'check',
                description: 'check ranking in the server',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'mention user whom rank you wanna check',
                        type: 'USER',
                    },
                ],
            },
            {
                name: 'leaderboard',
                description: 'shows the leaderboard of top 5 user of the server',
                type: 1,
                options: [
                    {
                        name: 'top',
                        description: 'number of top ranker do you want in the leaderboard',
                        type: 'NUMBER',
                    },
                ],
            },
            {
                name: 'update',
                description: 'updtae the user\'s to rank',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'user whose rank to update',
                        type: 'USER',
                        required: true,
                    },
                    {
                        name: 'rank',
                        description: 'updated rank',
                        type: 'NUMBER',
                        required: true,
                    },
                ],
            },
        ],
    },
    {
        name: 'vip',
        description: 'settiing up roles as vip, noone can tag them',
        options: [
            {
                name: 'add-vip',
                description: 'setting up vip roles',
                type: 1,
                options: [
                    {
                        name: 'role',
                        description: 'add the role you want to mark as vip',
                        type: 'ROLE',
                        required: true,
                    },
                ],
            },
            {
                name: 'remove-vip',
                description: 'adding vip roles',
                type: 1,
                options: [
                    {
                        name: 'role',
                        description: 'add the role you want to remove from vip',
                        type: 'ROLE',
                        required: true,
                    },
                ],
            },
            {
                name: 'clear',
                description: 'clear the vip roles for the server',
                type: 1,
            },
            {
                name: 'get-roles',
                description: 'get the list of vip roles setup for this guild',
                type: 1,
            },
        ],
    },
    {
        name: 'star-board',
        description: 'commands to setup the star board',
        options: [
            {
                name: 'enable',
                description: 'to enable the star board service',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'channel to set up starred messages',
                        type: 'CHANNEL',
                        required: true,
                    },
                    {
                        name: 'reactions',
                        description: 'minimum reactions required to stare a message',
                        type: 'NUMBER',
                        required: true,
                    },
                ],
            },
            {
                name: 'disable',
                description: 'to disable the star board service',
                type: 1,
            },
            {
                name: 'set-reactions',
                description: 'update the minimum reactions',
                type: 1,
                options: [
                    {
                        name: 'count',
                        description: 'insert number of reacions',
                        type: 'NUMBER',
                        required: true,
                    },
                ],
            },
            {
                name: 'set-channel',
                description: 'update the channel to send the starred message embeds',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'select the channel',
                        type: 'CHANNEL',
                        required: true,
                    },
                ],
            },
        ],
    },
    {
        name: 'profile',
        description: 'to manipulate the users profile',
        options: [
            {
                name: 'enable',
                description: 'start the profile feature',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'channel for profile commands',
                        type: 'CHANNEL',
                        required: true,
                    },
                ],
            },
            {
                name: 'disable',
                description: 'stop the profile commands',
                type: 1,
            },
            {
                name: 'set-channel',
                description: 'setting or updating the profile feature channel',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'channel to update',
                        type: 'CHANNEL',
                        required: true,
                    },
                ],
            },
            {
                name: 'create',
                description: 'to create a users profile',
                type: 1,
                options: [
                    {
                        name: 'name',
                        description: 'name of the user',
                        required: true,
                        type: 'STRING',
                    },
                    {
                        name: 'description',
                        description: 'description of the user',
                        required: true,
                        type: 'STRING',
                    },
                    {
                        name: 'twitter',
                        description: 'twitter of the user Ex: https://twitter.com/username',
                        type: 'STRING',

                    },
                    {
                        name: 'linkedin',
                        description: 'github of the user Ex: https://www.linkedin.com/in/username...',
                        type: 'STRING',
                    },
                    {
                        name: 'github',
                        description: 'github of the user Ex: https://www.github.com/username...',
                        type: 'STRING',
                    },
                    {
                        name: 'instagram',
                        description: 'instagram of the user Ex: https://instagram.com/username',
                        type: 'STRING',
                    },

                ],
            },
            {
                name: 'update',
                description: 'to update a users profile',
                type: 1,
                options: [
                    {
                        name: 'name',
                        description: 'name of the user',
                        type: 'STRING',
                    },
                    {
                        name: 'description',
                        description: 'description of the user',
                        type: 'STRING',
                    },
                    {
                        name: 'twitter',
                        description: 'twitter of the user Ex: https://twitter.com/username',
                        type: 'STRING',

                    },
                    {
                        name: 'linkedin',
                        description: 'github of the user Ex: https://www.linkedin.com/in/username...',
                        type: 'STRING',
                    },
                    {
                        name: 'github',
                        description: 'github of the user Ex: https://www.github.com/username...',
                        type: 'STRING',
                    },
                    {
                        name: 'instagram',
                        description: 'instagram of the user Ex: https://instagram.com/username',
                        type: 'STRING',
                    },
                ],
            },
            {
                name: 'get',
                description: 'to get the user link',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'user whom profile is to be fetched',
                        type: 'USER',
                    },
                ],
            },
            {
                name: 'delete',
                description: 'to delete a users profile',
                type: 1,
            },
        ],
    },
    {
        name: 'report-bug',
        description: 'report a bug to the development team',
        options: [
            {
                name: 'description',
                description: 'description of the bug',
                type: 'STRING',
                required: true,
            },
        ],
    },
    {
        name: 'help',
        description: 'help',
    },
]
