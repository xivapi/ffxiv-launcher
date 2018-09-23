import GameLauncher from "./GameLauncher";
import Characters from "./Characters";

/**
 * Watches all the buttons
 */
class ButtonActions
{
    watch()
    {
        this.watchAddCharacterWindow();
        this.watchCharacterSelection();
    }

    /**
     * Watch the "Add Character" window related buttons
     */
    watchAddCharacterWindow()
    {
        document.getElementById('Action.AddCharacter').onclick = event => {
            GameLauncher.requestLogin();
        };

        document.getElementById('Action.OpenAddCharacterWindow').onclick = event => {
            const ui = document.getElementById('add-character-form');

            if (!ui.classList.contains('open')) {
                ui.classList.add('open');
            }
        };
        document.getElementById('Action.CloseAddCharacterWindow').onclick = event => {
            const ui = document.getElementById('add-character-form');

            if (ui.classList.contains('open')) {
                ui.classList.remove('open');
            }
        };
    }

    /**
     * Watch for clicking on a character on the right side
     */
    watchCharacterSelection()
    {
        if (Object.keys(Characters.list).length === 0) {
            return;
        }

        document.getElementById('Action.BootCharacter').onclick = event => {
            const id = event.currentTarget.dataset.id;
            Characters.bootCharacter(id);
        };
    }
}

export default new ButtonActions();
