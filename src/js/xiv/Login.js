import GameFiles from './GameFiles';
import XIVRequest from './XIVRequest';

class Login
{
    constructor()
    {
        this.username = false;
        this.password = false;
        this.otp = false;

    }

    go(callback)
    {
        console.log('Attempting login ...');
        this.username = document.getElementById('username').value.trim();
        this.password = document.getElementById('password').value.trim();
        this.otp = document.getElementById('otp').value.trim();

        // ask for the real USER_SID
        this.getRealUserSid(callback);
    }

    getRealUserSid(callback)
    {
        console.log('get the REAL user sid');

        this.getSudoUserSid(SUDO_USER_ID => {
            console.log('Build version + hash');
            let localGameVersion = GameFiles.version(),
                localGameHash = GameFiles.hash();

            console.log('localGameVersion == '+ localGameVersion);
            console.log('localGameHash == '+ localGameHash);

            console.log('request the real users id ');
            XIVRequest.getRealUserSid(
                SUDO_USER_ID,
                localGameVersion,
                localGameHash,
                callback
            )
        });
    }

    getSudoUserSid(callback)
    {
        console.log('get the SUDO user sid');

        // get temp id for form
        this.getTempUserSid(TEMP_USER_ID => {
            // login to get  fake user id
            XIVRequest.getFakeUserSid(
                TEMP_USER_ID,
                this.username,
                this.password,
                this.otp,
                callback
            )
        });
    }

    getTempUserSid(callback)
    {
        console.log('get the TEMP user sid');

        XIVRequest.getTempUserSid(callback);
    }
}

export default new Login();