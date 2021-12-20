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
                    }
                ]
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
                        required: 'true'
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
                        required: 'true'
                    },
                ],
            },
        ],
    },
]