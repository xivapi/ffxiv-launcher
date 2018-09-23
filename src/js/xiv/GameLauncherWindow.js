const { remote } = require('electron');

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
    }
}

export default new GameLauncherWindow();

