import Settings from './Settings';
import os from 'os';
import crypto from 'crypto';

/**
 * This handles all auto-login logic
 */
class XIVRequest
{
    constructor() {
        this.machineId = this.generateMachineId();
        console.log("XIVRequest:constructor -> Generated MachineID: " + this.machineId);
    }

    printHex(char) {
        return ("0" + char.valueOf().toString(16)).substr(-2);
    };

    generateMachineId() {
        // Uses the same method as goaaats/FFXIVQuickLauncher.
        // See: https://github.com/goaaats/FFXIVQuickLauncher/blob/master/XIVLauncher/XIVGame.cs#L322
        const idstring = [ os.hostname().toUpperCase(), os.userInfo().username, `${os.type()} ${os.release()}`, os.cpus().length ].join('');
        var bytes = [];

        for (var i = 0; i < idstring.length; ++i) {
            bytes.concat([idstring.charCodeAt(i)]);
        }

        // Hash this data, yank the first 4 bytes and grab a checksum.
        var shasum = crypto.createHash('SHA1').update(Int8Array.from(bytes)).digest().slice(0, 4);
        var checksum = Math.abs(256 - (shasum.reduce((a, b) => a + b) % 256));

        // Put it together as a hex byte string.
        return [ this.printHex(checksum), ... shasum ].reduce((s, b) => s + this.printHex(b));
    }

    /**
     * Perform a request action
     */
    action(options, postdata, callback)
    {
        // request object
        let req = require("https").request(options, function (response) {
            let body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                callback({
                    headers: response.headers,
                    body: body,
                })
            });
            response.on('error', function (error) {
                console.log('RESPONSE_ERROR', error);
            })
        });

        req.on('error', function (error) {
            console.log('REQUEST_ERROR', error);
        });

        // if any post data, attach it
        if (postdata) {
            req.write(postdata);
        }

        req.end();
    }

    /**
     * Get the users temp session id for the login form.
     */
    getTempUserSid(callback)
    {
        console.log('XIVRequest --> getTempUserSid');

        // options
        let options = {
            host: Settings.se.LoginOAuthFormRequest.Host,
            port: Settings.se.LoginOAuthFormRequest.Port,
            path: Settings.se.LoginOAuthFormRequest.Path,
            method: Settings.se.LoginOAuthFormRequest.Method,
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            headers: {
                'User-Agent': Settings.se.UserAgent.replace('-id-', this.machineId),
            },
        };

        this.action(options, false, response => {
            callback(
                this.findDataInDom(response.body, '_STORED_')
            );
        });
    }

    /**
     * Get the users fake session id for a game-version check
     */
    getFakeUserSid(tempUserId, username, password, otp, callback)
    {
        console.log('XIVRequest --> getFakeUserSid: ' + tempUserId);

        const postdata = require('querystring').stringify({
            '_STORED_': tempUserId,
            'sqexid': username,
            'password': password,
            'otppw': otp
        });

        // options
        let options = {
            host: Settings.se.LoginOAuthActionRequest.Host,
            port: Settings.se.LoginOAuthActionRequest.Port,
            path: Settings.se.LoginOAuthActionRequest.Path,
            method: Settings.se.LoginOAuthActionRequest.Method,
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            headers: {
                'User-Agent': Settings.se.UserAgent.replace('-id-', this.machineId),
                'Content-Type': Settings.se.LoginOAuthActionRequest.ContentType,
                'Content-Length': postdata.length,
                'Referer': Settings.se.LoginOAuthActionRequest.Referer
            },
        };

        this.action(options, postdata, response => {
            callback(
                this.findDataInDom(response.body, 'login=auth,ok,sid')
            );
        });
    }

    /**
     * Get the users real session id!
     */
    getRealUserSid(tempUserId, localGameVersion, localGameHash, callback)
    {
        console.log('XIVRequest --> getRealUserSid: '+ tempUserId);

        let path = Settings.se.LoginGameVersionRequest.Path
            .replace('{GAMEVER}', localGameVersion)
            .replace('{USER_SID}', tempUserId);

        // options
        let options = {
            host: Settings.se.LoginGameVersionRequest.Host,
            port: Settings.se.LoginGameVersionRequest.Port,
            path: path,
            method: Settings.se.LoginGameVersionRequest.Method,
            rejectUnauthorized: false,
            requestCert: true,
            agent: false,
            headers: {
                'X-Hash-Check': 'X-Hash-Check',
                'User-Agent': Settings.se.UserAgent.replace('-id-', this.machineId),
                'Content-Type': Settings.se.LoginGameVersionRequest.ContentType,
                'Content-Length': localGameHash.length,
                'Referer': Settings.se.LoginGameVersionRequest.Referer
            },
        };

        this.action(options, localGameHash, response => {
             callback({
                latestGameVersion: response.headers['x-latest-version'],
                userRealSid: response.headers['x-patch-unique-id']
            });
        });
    }

    findDataInDom(body, data)
    {
        let line = body.split("\n").filter(line => line.indexOf(data) > -1)[0];

        if (!line) {
            return false;
        }

        return line
            .replace('<input type="hidden" name="_STORED_" value="', '')
            .replace('window.external.user("login=auth,ok,sid,', '')
            .replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,3,product,1");', '')
            .replace(',terms,1,region,3,etmadd,0,playable,1,ps3pkg,0,maxex,3,product,1");', '')
            .replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '')
            .replace(',terms,1,region,3,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '')
            .replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,1,product,1");', '')
            .replace(',terms,1,region,3,etmadd,0,playable,1,ps3pkg,0,maxex,1,product,1");', '')
            .replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,0,product,1");', '')
            .replace(',terms,1,region,3,etmadd,0,playable,1,ps3pkg,0,maxex,0,product,1");', '')
            .replace('">', '')
            .trim();
    }
}

export default new XIVRequest();
