import Settings from './Settings';
import Login from './Login';

class GameLauncher
{
    init()
    {
        document.getElementById('GameLauncher.Login').onclick = event => {
            this.requestLogin();
        };

        document.getElementById('GameLauncher.Bypass').onclick = event => {
            const sid = document.getElementById('bypass').value.trim();
            this.launchGame(sid);
        };
    }

    requestLogin()
    {
        Login.go(response => {
            console.log('LOGIN COMPLETE');
            console.log('USER SID == '+ response.userRealSid);
            console.log('LIVE GAME VERSION == '+ response.latestGameVersion);

            this.launchGame(response.userRealSid);
        });
    }

    launchGame(userSid)
    {
        const gameFilename = Settings.se.GamePath + Settings.se.Dx11Path;
        const gameArguments = [
            'DEV.TestSID=' + userSid,
            'DEV.MaxEntitledExpansionID=2',
            'language=1'
        ];

        require('child_process').execFile(gameFilename, gameArguments, function(err, data) {
            if(err){
               console.error(err);
               return;
            }

            console.log('running');
            // todo - do something here? Close the launcher? Hide in background?
        });
    }
}

export default new GameLauncher();
