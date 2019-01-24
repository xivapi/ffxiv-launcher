import GameFiles from './GameFiles';
import XIVRequest from './XIVRequest';
import Notice from './Notice';

class Login
{
    constructor()
    {
        this.username = false;
        this.password = false;
        this.otp = false;

    }

    login(username, password, otp, callback)
    {
        this.username = username;
        this.password = password;
        this.otp = otp;

        // ask for the real USER_SID
        this.getRealUserSid(callback);
    }

    getRealUserSid(callback)
    {
        this.getSudoUserSid(SUDO_USER_ID => {
            let localGameVersion = GameFiles.version();
            if (!localGameVersion) {
                Notice.show("Your game version could not be found, please check the game path via the settings.");
                return;
            }

            let localGameHash = GameFiles.hash();

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
