import Settings from './Settings';
import SettingsManager from './SettingsManager';
import Login from './Login';
import ButtonActions from './ButtonActions';
import Characters from './Characters';
import Lodestone from './LodestoneNews';
import GameFiles from './GameFiles';
import Notice from './Notice';
const fs = require('fs');
//const keytar = require('keytar');

class GameLauncher
{
    init()
    {
        // load custom settings
        SettingsManager.loadSettings();

        // load characters
        Characters.loadCharacters(true);
        Characters.loadGameServers();

        // watch button interactions
        ButtonActions.watch();

        // show lodestone news
        Lodestone.showNews();

        // this is on a loop so that if a character does not exist on the API,
        // then hopefully in the next few minutes it will. Current settings
        // is every 1 minute, if a character is on the API then it is not
        // queried anymore times.
        Characters.populateCharacterData();
        setInterval(() => {
            Characters.populateCharacterData();
        }, Settings.custom.xivapiPollDelay);
    }

    /**
     * Request a login to Square-Enix account system
     */
    requestLogin()
    {
        const name = $('#characterName').val().trim();
        const server = $('#characterServer').val().trim();
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        const otp = $('#otp').val().trim();

        // check we filled in form
        if (name.length === 0 || server.length === 0 || username.length === 0 || password.length === 0) {
            Notice.show('Please fill in the form correctly!');
            return;
        }

        // disable save button and inform user what we're doing
        $('#AddCharacter').prop('disable', true);
        Notice.show('<h1>Checking account details</h1><p>Using the details provided, the launcher is attempting to login so it can confirm and save this character.</p><p>This will not start the game.</p>');

        // process login
        Login.login(username, password, otp, response => {
            console.log('LOGIN COMPLETE');
            console.log('USER SID == '+ response.userRealSid);
            console.log('LIVE GAME VERSION == '+ response.latestGameVersion);

            if (response.userRealSid) {
                const id = require('uuid/v4')();

                // store password in users OS vault
                //keytar.setPassword('ffxiv-launcher', id, password);

                // save character
                Characters.saveCharacter({
                    id:         id,
                    api:        false,
                    lsid:       null,
                    name:       name,
                    server:     server,
                    avatar:     'https://xivapi.com/launcher/faceless.png',
                    username:   username,
                    password:   password,
                    otp:        otp.length > 1,
                    added:      (new Date).getTime()
                });

                // hide add character view
                $('.add-character-form').removeClass('open');
                Notice.show('<h1>Saved character!</h1><p>Click on the character on the right to start the game.</p>')
            } else {
                Notice.show('<h1>Login failed</h1><p>Either your Username/Password/OTP is wrong or the game is down for maintenance right now.</p>');
            }
        });
    }

    /**
     * Launch the game using the session id
     */
    launchGame(userSid)
    {
        const gameFilename = Settings.se.GamePath + Settings.se.Dx11Path;
        if (!fs.existsSync(gameFilename)) {
            Notice.show("Your game path could not be found, please update it via the settings.");
            return false;
        }

        let expansion = 2;
        if (Settings.expansion in Settings.expansions){
            expansion = Settings.expansion
        }

        let language = 1;
        if (Settings.language in Settings.languages){
            language = Settings.language
        }

        let region = 3;
        if (Settings.region in Settings.regions){
            region = Settings.region
        }

        const gameArguments = [
            'DEV.UseSqPack=' + Settings.se.UseSqPack,
            'DEV.DataPathType=' + Settings.se.DataPathType,
            'DEV.TestSID=' + userSid,
            'DEV.MaxEntitledExpansionID=' + expansion,
            'language=' + language,
            'SYS.Region=' + region,
            'ver=' + GameFiles.version()
        ];

        const options = {
            detached: true,
            stdio: 'ignore'
        };

        require('child_process').spawn(gameFilename, gameArguments, options);
    }
}

export default new GameLauncher();
