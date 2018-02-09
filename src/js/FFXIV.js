//
// THIS IS NOT USED ANYMORE
// WILL BE DELETED
//
// IT IS THE ORIGINAL CONCEPT
//



// i don't know if this is needed, the patch-gamever server needs https ssl certificate verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
    0 = Japanese
    1 = English
    2 = German
    3 = French

    0 = A Realm Reborn
    1 = Heavensward
    2 = Stormblood
*/


let fs = require('fs');
let request = require('request');
let sha1File = require('sha1-file')
let child = require('child_process').execFile;

// need an option for this, maybe auto-detect it from regedit entry? or just try %PROGRAMFILES(x86)%/SquareEnix
let gamePath = 'C:\\Program Files (x86)\\SquareEnix\\FINAL FANTASY XIV - A Realm Reborn';
let filenameDx9 = gamePath + '\\game\\ffxiv.exe';
let filenameDx11 = gamePath + '\\game\\ffxiv_dx11.exe';

let https = require("https");

function login() {
    let username = document.getElementById('username').value,
        password = document.getElementById('password').value,
        otp = document.getElementById('otp').value,
        dx11 = document.getElementById('dx11').checked;

    getRealSid(username, password, otp, (response) => {
        let sid = response.userRealSid;
        launchGame(sid, 1, dx11, 2);
    });
}

document.getElementById('login').onclick = login;

function launchGame(realsid, language, dx11, expansionLevel) {
    console.log('Launching game');

    let filenameArgs = [
        'DEV.TestSID=' + realsid,
        'DEV.MaxEntitledExpansionID=' + expansionLevel,
        'language=' + language
    ];

    console.log(dx11 ? filenameDx11 : filenameDx9);
    console.log(filenameArgs);

    child(dx11 ? filenameDx11 : filenameDx9, filenameArgs, function(err, data) {
        if(err){
           console.error(err);
           return;
        }

        console.log('running');

        // todo - do something here? Close the launcher? Hide in background?
    });
}

function getRealSid(username, password, otp, callback) {
    getSid(username, password, otp, sid => {

        let gamever = getLocalGameVersion();
        let hash = "ffxivboot.exe/" + generateHash('/boot/ffxivboot.exe') +
                   ",ffxivlauncher.exe/"+ generateHash('/boot/ffxivlauncher.exe') +
                   ",ffxivupdater.exe/"+ generateHash('/boot/ffxivupdater.exe');

        let path = "/http/win32/ffxivneo_release_game/"+ gamever +"/"+ sid;

        console.log('Hash: '+ hash);
        console.log('User SID: '+ sid);

        // options
        let options = {
            host: 'patch-gamever.ffxiv.com',
            port: 443,
            path: path,
            method: 'POST',
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            headers: {
                'X-Hash-Check': 'X-Hash-Check',
                'User-Agent': 'SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 9e75ab3012)',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': hash.length,
                'Referer': 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3',
            },
        };

        // request object
        let req = https.request(options, function (res) {
            let body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                console.log('gamever check complete');

                callback({
                    latestGameVersion: res.headers['x-latest-version'],
                    userRealSid: res.headers['x-patch-unique-id']
                });
            });
            res.on('error', function (err) {
                console.log(err);
            })
        });

        // req error
        req.on('error', function (err) {
            console.log(err);
        });
        req.write(hash);
        req.end();
    });
}

function getSid(username, password, otp, callback) {
    // grab storedId
    getStored(storedId => {

        console.log("StoredId: "+ storedId);

        // form data
        let querystring = require('querystring');
        let postData = querystring.stringify({
            '_STORED_': storedId,
            'sqexid': username,
            'password': password,
            'otppw': otp
        });

        // options
        let options = {
            host: 'ffxiv-login.square-enix.com',
            port: 443,
            path: '/oauth/ffxivarr/login/login.send',
            method: 'POST',
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            headers: {
                'User-Agent': 'SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 9e75ab3012)',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
                'Referer': 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3&isft=0&issteam=0',
            },
        };

        // request object
        let req = https.request(options, function (res) {
            let body = '';
            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function () {
                // todo - find a better way to do this, maybe cheerio dom reading
                body = body.split("\n");
                let line = false;
                for(let i in body) {
                    line = body[i];

                    if (line.indexOf('login=auth,ok,sid') > -1) {
                        break;
                    }
                }

                line = line.replace('window.external.user("login=auth,ok,sid,', '');
                line = line.replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '');
                callback(line.trim());
            });
            res.on('error', function (err) {
                console.log(err);
            })
        });

        // req error
        req.on('error', function (err) {
            console.log(err);
        });

        //send request witht the postData form
        req.write(postData);
        req.end();
    });
}

function getStored(callback) {
    let options = {
        url: 'https://ffxiv-login.square-enix.com/oauth/ffxivarr/login/top?lng=en&rgn=3&isft=0&issteam=0',
        headers: {
            'User-Agent': 'SQEXAuthor/2.0.0(Windows 6.2; ja-jp; 9e75ab3012)',
        }
    };

    request(options, function(error, response, body) {
        let line = body.split("\n").filter(line => line.indexOf('_STORED_') > -1)[0];

        if (!line)
          return; // No matches.

        callback(
          line.replace('<input type="hidden" name="_STORED_" value="', '').replace('">', '').trim()
        );
    });
}

function getLocalGameVersion() {
    let filename = gamePath + '/game/ffxivgame.ver';
    let buffer = fs.readFileSync(filename);
    let version = buffer.toString();

    console.log('Game Version: '+ version);

    return version;
}

function generateHash(filename) {
    filename = gamePath + filename;
    let hash = sha1File(filename);
    let length = fs.statSync(filename).size;

    return length + '/' + hash;
}
