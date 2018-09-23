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
        this.username = document.getElementById('username').value.trim();
        this.password = document.getElementById('password').value.trim();
        this.otp = document.getElementById('otp').value.trim();

        // ask for the real USER_SID
        this.getRealUserSid(callback);
    }

    getRealUserSid(callback)
    {
        this.getSudoUserSid(SUDO_USER_ID => {
            let localGameVersion = GameFiles.version(),
                localGameHash = GameFiles.hash();

            if (!localGameVersion || !localGameHash) {
                return;
            }

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
        XIVRequest.getTempUserSid(callback);
    }
}

export default new Login();
