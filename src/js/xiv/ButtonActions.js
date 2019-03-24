import GameLauncher from "./GameLauncher";
import Characters from "./Characters";
import SettingsManager from "./SettingsManager";
import LodestoneNews from "./LodestoneNews";
const dialog  = require('electron').remote.dialog;
const { shell } = require('electron');


/**
 * Watches all the buttons
 */
class ButtonActions
{
    watch()
    {
        const $html = $('html');
        const $addCharacterForm = $('.add-character-form');
        const $btnAddCharacter = $('#AddCharacter');
        const $windowSettingsForm = $('.settings-form');

        $html.on('click', '#AddCharacter', event => {
            GameLauncher.requestLogin();
        });

        $html.on('click', '#OpenAddCharacterWindow', event => {
            $addCharacterForm.addClass('open');
            $btnAddCharacter.prop('disabled', false);
        });

        $html.on('click', '#CloseAddCharacterWindow', event => {
            $addCharacterForm.removeClass('open');
            $btnAddCharacter.prop('disabled', false);
        });

        $html.on('click', '#FindGamePath', event => {
            const path = dialog.showOpenDialog({
                properties: ['openDirectory']
            });

            if (path) {
                document.getElementById('gamePath').value = path[0].trim();
            }
        });

        $html.on('click', '#SaveSettings', event => {
            const gamePath = document.getElementById('gamePath').value.trim();
            const expansion = document.getElementById('expansion').value.trim();
            const language = document.getElementById('language').value.trim();
            const region = document.getElementById('region').value.trim();
            const raelyslanguage = document.getElementById('raelysLanguage').value.trim();

            SettingsManager.saveSettings({
                gamePath: gamePath,
                expansion: expansion,
                language: language,
                region: region,
                raelysLanguage: raelyslanguage
            });

            document.getElementById('settings-form').classList.remove('open');
        });

        $html.on('click', '#OpenLauncherSettingsWindow', event => {
            $windowSettingsForm.addClass('open');
        });

        $html.on('click', '#CloseLauncherSettingsWindow', event => {
            $windowSettingsForm.removeClass('open');
        });

        $html.on('click', '#ShowCharacter', event => {
            const id = $(event.currentTarget).data('id');
            Characters.showCharacter(id);
        });

        $html.on('click', '#StartGame', event => {
            const id = $(event.currentTarget).data('id');
            Characters.bootCharacter(id);
        });

        $html.on('click', '#DeleteCharacter', event => {
            const id = $(event.currentTarget).data('id');
            Characters.deleteCharacter(id);
        });

        $html.on('click', '#ShowLodestoneNews', event => {
            LodestoneNews.open ? LodestoneNews.hideNews() : LodestoneNews.showNews();
        });

        $html.on('click', '#ShowMogStation', event => {
            shell.openExternal("https://secure.square-enix.com/account/app/svc/mogstation/");
        });

        $html.on('keyup', '#otp2', event => {
            if (event.keyCode === 13) {
                $('.btn-start-game').trigger('click');
            }
        })
    }
}

export default new ButtonActions();
