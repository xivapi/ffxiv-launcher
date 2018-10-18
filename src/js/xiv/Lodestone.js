import RaelysAPI from "./RaelysAPI";
import XIVAPI from "./XIVAPI";
/**
 * Show lodestone info
 */
/** class Lodestone
{
    init()
    {
        this.fetchNews();
    }

    fetchNews()
    {
        XIVAPI.getLodestoneData(response => {
            const ui = document.getElementById('lodestone');
            response.News.forEach(post => {
                const html = document.createElement('div');
                html.innerHTML = `<div>${post.Title}</div>`
                
                
                ui.appendChild(html);
            });
        });
    }
}*/

class Lodestone
{
    init()
    {
        this.fetchNews();
    }

    fetchNews()
    {
        RaelysAPI.getLodestoneData(response => {
            const ui = document.getElementById('lodestone');
            response.News.forEach(post => {
                const html = document.createElement('div');
                html.innerHTML = `<div>${post.Title}</div>`
                
                
                ui.appendChild(html);
            });
        });
    }
}

export default new Lodestone();