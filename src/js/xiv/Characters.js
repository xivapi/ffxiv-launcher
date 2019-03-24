import GameLauncher from "./GameLauncher";
import Notice from './Notice';
import XIVAPI from "./XIVAPI";
import Login from "./Login";
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

        this.servers = {
            "Aether":["Adamantoise","Balmung","Cactuar","Coeurl","Faerie","Gilgamesh","Goblin","Jenova","Mateus","Midgardsormr","Sargatanas","Siren","Zalera"],
            "Chaos":["Cerberus","Lich","Louisoix","Moogle","Odin","Omega","Phoenix","Ragnarok","Shiva","Zodiark"],
            "Elemental":["Aegis","Atomos","Carbuncle","Garuda","Gungnir","Kujata","Ramuh","Tonberry","Typhon","Unicorn"],
            "Gaia":["Alexander","Bahamut","Durandal","Fenrir","Ifrit","Ridill","Tiamat","Ultima","Valefor","Yojimbo","Zeromus"],
            "Mana":["Anima","Asura","Belias","Chocobo","Hades","Ixion","Mandragora","Masamune","Pandaemonium","Shinryu","Titan"],
            "Primal":["Behemoth","Brynhildr","Diabolos","Excalibur","Exodus","Famfrit","Hyperion","Lamia","Leviathan","Malboro","Ultros"]
        };

        $('.character-fade').on('click', event => {
            this.hideCharacterView();
        });
    }

    /**
     * Load the game servers into the "Add Character" server selection.
     */
    loadGameServers()
    {
        const $select = $('#characterServer');

        for(let dc in this.servers) {
            let servers = this.servers[dc];
            const $ele = $(`<optgroup label="${dc}"></optgroup>`);

            for(let i in servers) {
                let server = servers[i];
                $ele.append(`<option value="${server}">${server}</option>`);
            }

            $select.append($ele);
        }
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

    /**
     * Update a character in our list
     */
    saveCharacter(character)
    {
        this.list[character.id] = character;
        this.saveCharacterList(true);
    }

    /**
     * Save the character list and reload the visual list
     */
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

    /**
     * Load characters
     * @param populate
     */
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

        // character list
        this.list = JSON.parse(list);

        // dom element
        const $list = $('.cl-list');
        $list.html('');

        for(let i in this.list) {
            let character = this.list[i];

            const otp = character.otp ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M368 13H144q-18 0-31 13t-13 31v403q0 18 13 31t31 13h224q18 0 31-13t13-31V57q0-18-13-31t-31-13zm-14 402H158q-6 0-10-4t-4-10V98q0-6 4-10t10-4h196q5 0 9.5 4t4.5 10v303q0 6-4.5 10t-9.5 4z"/></svg>' : '';

            $list.append(`
                <button id="ShowCharacter" data-id="${character.id}">
                    <div>
                        ${otp}
                        <h4>${character.name ? character.name : 'NoName'}</h4>
                    </div>
                    <img src="${character.avatar}">
                </button>
            `);
        }

        if (populate) {
            // populate character info
            this.populateCharacterData();
        }
    }

    /**
     * Request a character to be deleted
     */
    deleteCharacter(id)
    {
        // do nothing if no characters
        if (Object.keys(this.list).length === 0) {
            return;
        }

        delete this.list[id];
        this.saveCharacterList(true);
        this.hideCharacterView();
    }

    /**
     * Show a specific characters information and "START GAME" action
     */
    showCharacter(id)
    {
        const $view = $('.character-view');
        const character = this.list[id];
        $('.character-fade').addClass('open');

        let otp = '';
        if (character.otp) {
            otp = `<div><input type="text" class="otp2" id="otp2" placeholder="OTP"></div>`
        }

        $view.html(`
            <div>
                <img src="${character.avatar}" class="avatar">
                <h1>${character.name}</h1>
                <small>${character.server}</small>
            </div>
            <hr>
            <div>
                ${otp}
                <button id="StartGame" class="btn-start-game" data-id="${character.id}">START GAME</button>
            </div>
            <hr>
            <div>
                <button id="DeleteCharacter" class="btn-delete-character" data-id="${character.id}">Delete Character</button>
            </div>        
        `);

        $view.addClass('open');
    }

    /**
     * Hide the characters information view
     */
    hideCharacterView()
    {
        $('.character-view').removeClass('open');
        $('.character-fade').removeClass('open');
    }

    /**
     * Boot up a specific character, will auto-login and start the game.
     */
    bootCharacter(id)
    {
        // grab character
        const character = this.list[id];
        if (typeof character === 'undefined') {
            // this IN THEORY should never happen ...
            Notice.show('<h1>Character save invalid</h1><p>could not find character in load list</p>');
        }

        // notify user
        Notice.show('<h1>Starting Game</h1><p>Logging into character...</p>');
        this.hideCharacterView();

        // get otp if its needed
        const otp = $('#otp2').val();

        // login to character
        Login.login(character.username, character.password, otp, response => {
            // launch game!
            Notice.show('<h1>Starting Game</h1><p>Launching game!</p>');
            GameLauncher.launchGame(response.userRealSid);

            // hide notice after 5 seconds
            setTimeout(() => {
                Notice.hide();
            }, 5000);
        });
    }
}

export default new Characters();
