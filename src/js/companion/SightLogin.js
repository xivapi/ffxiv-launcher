const NodeRSA = require('node-rsa');
const uuidv4 = require('uuid/v4');
const pem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtDLA2/jQxScusojWLHyh
CYNW8S9yM+DuaLgiXZC/tk79H1u4jiip1kRx2zrQ9nvnMqYMNYarqKDlJmIL10B5
UWY+vDXdXXiXx5qQtj+NgPslhiZMDxpA0EfDvBdQ7Hmk/m1qocP0i0uYVzvyZBKW
N1Xj1QDuZzKfXP6rpfPVB1rSwxAMpEcyMHhtsTsEf+w9Sr+Wy/oJQau+k+rLhYtl
n+HsF9LCn5d1O4AuBFOHDh5gAitRjl2cp0hHYRYHQ0WAwYqeTqi+HW2XJAU/cCWX
F9LFjKH7Q6LBrcQzgbFsn1jwE4gKGl/DxZWFFLMYoUrHU5z/cGfVH8k6Lheu02b9
hQIDAQAB
-----END PUBLIC KEY-----`.trim();

class SightLogin
{
    login()
    {
        const id  = 'a61703f8-7f30-4949-8104-aba1437cf9e4'; //uuidv4();
        const key = new NodeRSA(pem);
        const uid = key.encrypt(id, 'base64');
        console.log(uid);

        fetch('https://companion.finalfantasyxiv.com/sight-v060/sight/login/token', {
            method: 'POST',
            body: JSON.stringify({
                appVersion: '1.2.0',
                platform: 2,
                uid: uid
            }),
            headers: {
                "Accept" : '*/*',
                "Accept-Language": 'en-gb',
                "Accept-Encoding": 'br, gzip, deflate',
                "user-agent": 'ffxivcomapp-e/1.2.0.0 CFNetwork/978.0.7 Darwin/18.5.0',
                "token": "",
                "request-id": uuidv4().toUpperCase(),
                "Content-Type": "application/json;charset=utf-8"
            },
        }).then(function(response) {
            console.log(response);
        }, function(error) {
            console.log(error);
        });
    }
}

export default new SightLogin();
