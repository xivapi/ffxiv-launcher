import Settings from "./Settings";

/**
 * Interact with XIVAPI
 */
class RaelysAPI
{

    getLodestoneData(callback)
    {
        this.request('/news/feed', [], callback);
    }

    /**
     * Send request to XIVAPI
     */
    request(url, params, callback)
    {
        url = `${Settings.custom.RaelysAPIEndpoint}${url}`;
        url = `${url}?${params.join('&')}`;

        console.log(url);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(
                    JSON.parse(xhr.responseText)
                );
            } else if (xhr.readyState === 4) {
                console.error('RaePI ERROR', xhr.status);
            }
        };

        xhr.send(
            //JSON.stringify(payload)
        );
    }
}

export default new RaelysAPI();