import Settings from './Settings';
const sha1File = require('sha1-file');
const filesystem = require('fs');

class GameFiles
{
    hash()
    {
        return "ffxivboot.exe/" + this.getSizeAndHash('/boot/ffxivboot.exe') +
               ",ffxivlauncher.exe/"+ this.getSizeAndHash('/boot/ffxivlauncher.exe') +
               ",ffxivupdater.exe/"+ this.getSizeAndHash('/boot/ffxivupdater.exe');
    }

    version()
    {
        let filename = Settings.se.GamePath + '/game/ffxivgame.ver',
            buffer = filesystem.readFileSync(filename);

        return buffer.toString();
    }

    getSizeAndHash(filename)
    {
        filename = Settings.se.GamePath + filename;
        let hash = sha1File(filename);
        let length = filesystem.statSync(filename).size;
        return length + '/' + hash;
    }
}

export default new GameFiles();