/**
 * FFXIV Custom Launcher Settings
 */
module.exports = {
    custom: {
        // XIVAPI
        xivapiEndpoint: "https://xivapi.com",
        xivapiPollDelay: 10000,
        RaelysAPIProtocol: "http://",
        RaelysAPIURL: "lodestone.raelys.com",
        RaelysAPIEndpoint: "http://na.lodestone.raelys.com",
        RaelysAPILanguages: {
            "na": 'North America',
            "de": 'Germany',
            "eu": 'Europe',
            "fr": 'France',
            "jp": 'Japan',
        },
        // Characters
        checkCharacterExpiryDelay: 60000,
    },
    // Square-Enix specific options
    se: {
        GamePath: 'C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn',
        Dx9Path: '\\game\\ffxiv.exe',
        Dx11Path: '\\game\\ffxiv_dx11.exe',
        UserAgent: 'SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 45d19cc985)',
        UseSqPack: 1,
        DataPathType: 1,
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
    },
    // the numbers of these are important
    regions: {
        0: 'No Message', //Data Center not working
        1: 'Japanese Message',
        2: 'ESRB Rating Message',
        3: 'No Message' //Data Center working
    },
};
