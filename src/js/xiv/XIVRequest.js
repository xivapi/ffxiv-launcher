import Settings from './Settings';

/**
 * This handles all auto-login logic
 */
class XIVRequest
{
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
                'User-Agent': Settings.se.UserAgent,
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
                'User-Agent': Settings.se.UserAgent,
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
                'User-Agent': Settings.se.UserAgent,
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
            .replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '')
            .replace(',terms,1,region,3,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '')
            .replace('">', '')
            .trim();
    }
}

export default new XIVRequest();
