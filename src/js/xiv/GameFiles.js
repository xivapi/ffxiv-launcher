import Settings from './Settings';
const sha1File = require('sha1-file');
const fs = require('fs');

class GameFiles
{
    hash()
    {
        const files = [
            'ffxivboot.exe',
            'ffxivboot64.exe',
            'ffxivlauncher.exe',
            'ffxivlauncher64.exe',
            'ffxivupdater.exe',
            'ffxivupdater64.exe'
        ];

        for(let i in files) {
            const sizeAndHash = this.getSizeAndHash(`/boot/${files[i]}`);

            if (!sizeAndHash) {
                return false;
            }

            files[i] = `${files[i]}/${sizeAndHash}`;
        }

        return files.join(',');
    }

    version()
    {
        let filename = Settings.se.GamePath + '/game/ffxivgame.ver';
        if (!fs.existsSync(filename)) {
            return false;
        }

        let buffer = fs.readFileSync(filename);

        return buffer.toString();
    }

    getSizeAndHash(filename)
    {
        filename = Settings.se.GamePath + filename;

        if (!fs.existsSync(filename)) {
            alert("Your game path could not be found, please update it via the settings.");
            return false;
        }

        let hash = sha1File(filename),
            length = fs.statSync(filename).size;
        return length + '/' + hash;
    }
}

export default new GameFiles();
