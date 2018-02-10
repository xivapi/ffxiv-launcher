// Initialize Game Launcher logic
import GameLauncher from './xiv/GameLauncher';
GameLauncher.init();

//
// Misc crap
//

document.getElementById('Window.BG').addEventListener('change', event => {
    document.getElementsByTagName('html')[0].className = document.getElementById('Window.BG').value;
});