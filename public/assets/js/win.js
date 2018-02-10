const { remote } = require('electron');
let maximizeState = false;

document.getElementById("Launcher.Window.Min").addEventListener("click", event => {
    let window = remote.BrowserWindow.getFocusedWindow();
    window.minimize();
});

document.getElementById("Launcher.Window.Max").addEventListener("click", event => {
    let window = remote.BrowserWindow.getFocusedWindow();

    if (maximizeState) {
        window.unmaximize();
        maximizeState = false;
        return;
    }

    window.maximize();
    maximizeState = true;
});

document.getElementById("Launcher.Window.Close").addEventListener("click", event => {
    let window = remote.BrowserWindow.getFocusedWindow();
    window.close();
});
