import GameLauncher from "./GameLauncher";
import ButtonActions from "./ButtonActions";
import XIVAPI from "./XIVAPI";
const moment = require("moment");
const fs = require("fs");
const app = require('electron').remote.app;

/**
 * Handle managing saved characters
 */
class Characters
{
    constructor()
    {
        this.list = {};
        this.directory = app.getPath('userData') + '/data/';
        this.filename = 'characters.json';
    }

    /**
     * Populates some data from XIVAPI
     */
    populateCharacterData()
    {
        // do nothing if no characters
        if (Object.keys(this.list).length === 0) {
            return;
        }

        for(let i in this.list) {
            let character = this.list[i];

            // only process null characters
            if (character.lsid === null) {
                // search for character
                XIVAPI.searchCharacter(character.name, character.server, response => {
                    if (response.Pagination.ResultsTotal > 0) {
                        for(let i in response.Results) {
                            let result = response.Results[i];

                            // if found, update character
                            if (result.Name === character.name && result.Selection === character.Server) {
                                // update character and request to save it
                                character.avatar = result.Avatar;
                                character.lsid = result.ID;
                                this.saveCharacter(character);
                                break;
                            }
                        }
                    }
                });
            }

            // process adding to XIVAPI
            if (character.lsid !== null && character.api === false) {
                XIVAPI.getCharacter(character.lsid, response => {
                    if (response.Info.Character.State === 2) {
                        character.api = true;
                        this.saveCharacter(character);
                    }
                });
            }
        }
    }

    removeExpiredCharacters()
    {
        // do nothing if no characters
        if (Object.keys(this.list).length === 0) {
            return;
        }

        let listModified = false;
        for(let i in this.list) {
            let character = this.list[i];


            let expires = moment(character.added).add(7, 'days');
            let today = moment();

            // if today is after the expiry time, delete it.
            if (today.isAfter(expires)) {
                delete this.list[i];
                listModified = true;
            }
        }

        // save character list + reload and populate it.
        if (listModified) {
            this.saveCharacterList(true);
        }
    }

    saveCharacter(character)
    {
        this.list[character.id] = character;
        this.saveCharacterList(true);
    }

    saveCharacterList(populate)
    {
        // create directory if it does not exist
        if (!fs.existsSync(this.directory)){
            fs.mkdirSync(this.directory);
        }

        const json = JSON.stringify(this.list, null, 2);
        fs.writeFileSync(`${this.directory}${this.filename}`, json, "utf-8");

        // cheap way to initialize all ui :D
        this.loadCharacters(populate);
    }

    loadCharacters(populate)
    {
        // if directory does not exist, create it + the characters file
        if (!fs.existsSync(this.directory)){
            this.saveCharacterList(false);
            return;
        }

        // if file does not exist
        if (!fs.existsSync(`${this.directory}${this.filename}`)) {
            console.log('No character.json file');
            return;
        }

        // load character list
        let list = fs.readFileSync(`${this.directory}${this.filename}`, 'utf8');

        // do nothing if we have no saved characters
        if (list.length === 0) {
            return;
        }

        this.list = JSON.parse(list);

        const ui = document.getElementById('cl-list');
        ui.innerHTML = '';

        for(let i in this.list) {
            let character = this.list[i];
            let row = document.createElement('div');
            row.classList.add('cl-row');

            // timestamp
            let added = moment(character.added).add(7, 'days').fromNow();

            // row html
            row.innerHTML = `
                <button id="Action.BootCharacter" data-id="${character.id}">
                    <img src="${character.avatar}">
                    <div>
                        <h4>${character.name ? character.name : 'NoName'}</h4>
                        <small>${character.name ? character.server : '-'}</small>
                        <span>Expires: ${added}</span>
                    </div>
                </button>
            `;

            ui.appendChild(row);
        }

        // watch character selection
        ButtonActions.watchCharacterSelection();

        if (populate) {
            // populate character info
            this.populateCharacterData();
        }
    }

    bootCharacter(id)
    {
        // grab character
        const character = this.list[id];
        if (typeof character === 'undefined') {
            // this IN THEORY should never happen ...
            alert('Character save invalid ... could not find character in load list');
        }

        GameLauncher.launchGame(character.session);
    }
}

export default new Characters();
