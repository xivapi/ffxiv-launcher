import Settings from "./Settings";
const fs = require("fs");
const app = require('electron').remote.app;

class SettingsManager
{
    constructor()
    {
        // List of custom settings
        this.custom = {
            gamePath: null,
        };

        this.directory = app.getPath('userData') + '/data/';
        this.filename = 'settings.json';
    }

    setOption(option, value)
    {
        this.custom[option] = value;
    }

    loadSettings()
    {
        // create directory if it does not exist
        if (!fs.existsSync(this.directory)){
            fs.mkdirSync(this.directory);
        }

        // if file does not exist, create it
        if (!fs.existsSync(`${this.directory}${this.filename}`)) {
            this.saveSettings();
        }

        // load character list
        const localSettings = fs.readFileSync(`${this.directory}${this.filename}`, 'utf8');
        if (localSettings !== null && localSettings.length > 3) {
            this.custom = JSON.parse(localSettings);
        }

        // special ones that are required for the launcher
        Settings.se.GamePath = this.custom.gamePath;
        Settings.language = this.custom.language; //Game Language
        Settings.region = this.custom.region; //Game Language
        Settings.RaelysAPILanguage = this.custom.raelysLanguage;
        Settings.expansion = this.custom.expansion;
        
        // populate forms
        for (let option in this.custom) {
            let value = this.custom[option];
            document.getElementById(option).value = value;
        }
    }

    saveSettings(settings)
    {
        for (let option in settings) {
            let value = settings[option];
            this.setOption(option, value);
        }

        const json = JSON.stringify(this.custom, null, 2);
        fs.writeFileSync(`${this.directory}${this.filename}`, json, "utf-8");

        // reload settings as it does some critical checks
        this.loadSettings();
    }
}

export default new SettingsManager();
