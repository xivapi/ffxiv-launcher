import Settings from './Settings';
const https = require("https");

// i don't know if this is needed, the patch-gamever server needs https ssl certificate verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

class Request
{
    action(options, postdata, callback)
    {
        // request object
        let req = https.request(options, function (response) {
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
                console.log(
                    'RESPONSE_ERROR', error
                );
            })
        });

        req.on('error', function (error) {
            console.log(
                'REQUEST_ERROR', error
            );
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
            let line = response.body.split("\n").filter(line => line.indexOf('_STORED_') > -1)[0];

            if (!line) {
                console.error('GET_TEMP_USER_SID_FAIL', 'No _STORED_ input on html form.');
                return;
            }

            let id = line.replace('<input type="hidden" name="_STORED_" value="', '').replace('">', '').trim();
            console.log('getTempUserSid == '+ id);
            callback(id);
        });
    }

    /**
     * Get the users fake session id for a game-version check
     */
    getFakeUserSid(tempUserId, username, password, otp, callback)
    {
        const QueryString = require('querystring');
        const postdata = QueryString.stringify({
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
            let line = response.body.split("\n").filter(line => line.indexOf('login=auth,ok,sid') > -1)[0];

            if (!line) {
                console.error('GET_FAKE_USER_SID_FAIL', 'No "login=auth,ok,sid" input on html form.');
                return;
            }

            let id = line.replace('window.external.user("login=auth,ok,sid,', '').replace(',terms,1,region,2,etmadd,0,playable,1,ps3pkg,0,maxex,2,product,1");', '').trim();
            console.log('getFakeUserSid == '+ id);
            callback(id);
        });
    }

    getRealUserSid(tempUserId, localGameVersion, localGameHash, callback)
    {
        let path = Settings.se.LoginGameVersionRequest.Path;
        path = path.replace('{GAMEVER}', localGameVersion);
        path = path.replace('{USER_SID}', tempUserId);

        console.log('path = ' + path);

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
            console.log(response);
             callback({
                latestGameVersion: response.headers['x-latest-version'],
                userRealSid: response.headers['x-patch-unique-id']
            });
        });
    }
}

export default new Request();