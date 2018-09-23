/**
 * FFXIV Custom Launcher Settings
 */
module.exports = {
    custom: {
        // XIVAPI
        xivapiEndpoint: "https://xivapi.com",
        xivapiKey: "9ba8086eb2f048e780d33f1b",
        xivapiPollDelay: 60000,

        // Characters
        checkCharacterExpiryDelay: 60000,
    },
    // Square-Enix specific options
    se: {
        GamePath: 'C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn',
        Dx9Path: '\\game\\ffxiv.exe',
        Dx11Path: '\\game\\ffxiv_dx11.exe',
        UserAgent: 'SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 9e75ab3012)',
        LoginGameVersionRequest: {
            Host: 'patch-gamever.ffxiv.com',
            Port: 443,
            Path: '/http/win32/ffxivneo_release_game/{GAMEVER}/{USER_SID}',
            ContentType: 'application/x-www-form-urlencoded',
            Referer: 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3'
        },
        LoginOAuthFormRequest: {
            Host: 'ffxiv-login.square-enix.com',
            Port: 443,
            Path: '/oauth/ffxivarr/login/top?lng=en&rgn=3&isft=0&issteam=0',
            Method: 'POST',
        },
        LoginOAuthActionRequest: {
            Host: 'ffxiv-login.square-enix.com',
            Port: 443,
            Path: '/oauth/ffxivarr/login/login.send',
            Method: 'POST',
            ContentType: 'application/x-www-form-urlencoded',
            Referer: 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3&isft=0&issteam=0'
        }
    },
    // the numbers of these are important
    languages: {
        0: 'Japanese',
        1: 'English',
        2: 'German',
        3: 'French',
    },
    // the numbers of these are important
    expansions: {
        0: 'A Realm Reborn',
        1: 'Heavensward',
        2: 'Stormblood'
    }
};
