module.exports = [
    {
        name: 'ping',   
        description: 'shows the ping'
    },
    {
        name: 'welcome',
        description: 'welcome commands start or stop',
        options: [
            {
                name: 'start',
                description: 'start the welcoming of the server member',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'channel to welcome',
                        type: 'CHANNEL',
                        required: true,
                    },
                    {
                         name: 'time',
                         description: 'time frame for a message to disappear in seconds',
                         type: 'NUMBER',
                         required: true,
                    },
                ],
            },
            {
                name: 'stop',
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
                    }
                ]
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
                        required: true
                    }
                ],
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
                name: 'check',
                description: 'check ranking in the server',
                type: 1,
                options: [
                    {
                        name: 'user',
                        description: 'mention user whom rank you wanna check',
                        type: 'USER'
                    },
                ],
            },
            {
                name: 'leaderboard',
                description: 'shows the leaderboard of top 5 user of the server',
                type: 1,
            },
            {
                name: 'reset-ranking',
                description: ' to reset the whole ranking',
                type: 1,
            },
        ],
    },
]