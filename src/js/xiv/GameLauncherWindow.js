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
            let window = remote.BrowserWindow.getFocusedWindow();
            window.minimize();
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
            let window = remote.BrowserWindow.getFocusedWindow();
            window.close();
        });

        /**
         * Ensures links open externally and not within the launcher
         */
        $(document).on('click', 'a[href^="http"]', (event) => {
            event.preventDefault();
            shell.openExternal(event.target.href);
        });
    }
}

export default new GameLauncherWindow();

