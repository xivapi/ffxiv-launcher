import Settings from './Settings';
import Login from './Login';
import Servers from './Servers';
import ButtonActions from './ButtonActions';
import Characters from './Characters';

class GameLauncher
{
    init()
    {
        // load characters
        Characters.loadCharacters(true);

        // watch button interactions
        ButtonActions.watch();

        // populate server list
        this.populateCharacterAddServerList();

        // this is on a loop so that if a character does not exist on the API,
        // then hopefully in the next few minutes it will. Current settings
        // is every 1 minute, if a character is on the API then it is not
        // queried anymore times.
        Characters.populateCharacterData();
        setInterval(() => {
            console.log('Polling ...');
            Characters.populateCharacterData();
        }, Settings.custom.xivapiPollDelay);

        // Check if any character sessions have expired, if so
        // they will be removed from the list
        // todo - this could be handled better, eg prompt user
        Characters.removeExpiredCharacters();
        setInterval(() => {
            console.log('Check Expiry ...');
            Characters.removeExpiredCharacters();
        }, Settings.custom.checkCharacterExpiryDelay);
    }

    /**
     * Populate the list of game servers
     */
    populateCharacterAddServerList()
    {
        let select = document.getElementById("characterServer");
        for(let i in Servers) {
            let server = Servers[i];
            let option = document.createElement("option");
            option.text = server;
            select.add(option);
        }
    }

    /**
     * Request a login to Square-Enix account system
     */
    requestLogin()
    {
        const ui = document.getElementById('Action.AddCharacter');
        ui.disabled = true;
        ui.innerHTML = 'Please wait ...';

        Login.go(response => {
            console.log('LOGIN COMPLETE');
            console.log('USER SID == '+ response.userRealSid);
            console.log('LIVE GAME VERSION == '+ response.latestGameVersion);

            if (response.userRealSid) {
                // save it
                Characters.saveCharacter({
                    id:         require('uuid/v4')(),
                    api:        false,
                    lsid:       null,
                    name:       document.getElementById("characterName").value.trim(),
                    server:     document.getElementById("characterServer").value.trim(),
                    avatar:     'https://xivapi.com/launcher/faceless.png',
                    session:    response.userRealSid,
                    added:      (new Date).getTime()
                });

                // hide add character view
                document.getElementById('add-character-form').classList.remove('open');
                alert('Saved character! Click on the character on the right to start the game.');
            } else {
                alert('Login failed - Either your Username/Password/OTP is wrong or the game is down for maintenance right now.');
            }

            ui.disabled = false;
            ui.innerHTML = 'Add Character';
        });
    }

    /**
     * Launch the game using the session id
     */
    launchGame(userSid)
    {
        const gameFilename = Settings.se.GamePath + Settings.se.Dx11Path;
        const gameArguments = [
            'DEV.TestSID=' + userSid,
            'DEV.MaxEntitledExpansionID=2',
            'language=1'
        ];

        require('child_process').execFile(gameFilename, gameArguments, function(err, data) {
            if (err){
                // This can error when you close the app, which isn't really that legitimate of an error...
                //console.error(err);
                return;
            }

            console.log('running');
            // todo - do something here? Close the launcher? Hide in background?
        });
    }
}

export default new GameLauncher();


