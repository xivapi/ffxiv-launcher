const { remote } = require('electron');
const shell = require('electron').shell;

class GameLauncherWindow
{
    constructor()
    {
        this.maximizeState = false;
    }

    init()
    {
        document.getElementById("Launcher.Window.Min").addEventListener("click", () => {
            remote.BrowserWindow.getFocusedWindow().minimize();
        });

        document.getElementById("Launcher.Window.Max").addEventListener("click", () => {
            let window = remote.BrowserWindow.getFocusedWindow();

            if (this.maximizeState) {
                window.unmaximize();
                this.maximizeState = false;
                return;
            }

            window.maximize();
            this.maximizeState = true;
        });

        document.getElementById("Launcher.Window.Close").addEventListener("click", () => {
            remote.BrowserWindow.getFocusedWindow().close();
        });

        /**
         * Ensures links open externally and not within the launcher
         */
        $(document).on('click', 'a[href^="http"]', (event) => {
            event.preventDefault();
            shell.openExternal(event.target.href);
        });

        /**
         * Set a random background
         */
        const bgNumber = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
        $('main').css('background', `url('https://xivapi.com/launcher/background${bgNumber}.jpg')`);
        $('main').css('background-size', 'cover');
    }
}

export default new GameLauncherWindow();

