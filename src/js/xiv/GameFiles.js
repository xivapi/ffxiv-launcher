import Settings from './Settings';
const sha1File = require('sha1-file');
const filesystem = require('fs');

class GameFiles
{
    hash()
    {
        const files = [
            'ffxivboot.exe',
            'ffxivlauncher.exe',
            'ffxivupdater.exe'
        ];

        for(let i in files) {
            const sizeAndHash = this.getSizeAndHash(`/boot/${files[i]}`);
            files[i] = `${files[i]}/${sizeAndHash}`;
        }

        return files.join(',');
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
        let hash = sha1File(filename),
            length = filesystem.statSync(filename).size;
        return length + '/' + hash;
    }
}

export default new GameFiles();
