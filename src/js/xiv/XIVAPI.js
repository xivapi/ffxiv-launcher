import Settings from "./Settings";

/**
 * Interact with XIVAPI
 */
class XIVAPI
{
    getCharacter(id, callback)
    {
        this.request(`/character/${id}`, [], callback);
    }

    searchCharacter(name, server, callback)
    {
        name = name.replace(' ', '+');
        const params = [
            `name=${name}`,
            `server=${server}`
        ];

        this.request('/character/search', params, callback);
    }

    getLodestoneData(callback)
    {
        this.request('/lodestone', [], callback);
    }

    /**
     * Send request to XIVAPI
     */
    request(url, params, callback)
    {
        const timestamp = +new Date;

        url = `${Settings.custom.xivapiEndpoint}${url}`;
        params.push(`t=${timestamp}`);
        url = `${url}?${params.join('&')}`;

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(
                    JSON.parse(xhr.responseText)
                );
            } else if (xhr.readyState === 4) {
                console.error('XIVAPI ERROR', xhr.status);
            }
        };

        xhr.send(
            //JSON.stringify(payload)
        );
    }
}


export default new XIVAPI();
