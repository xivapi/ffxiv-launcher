import RaelysAPI from "./RaelysAPI";
const { shell } = require('electron')

/**
 * Show lodestone news
 */
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
            response.forEach(post => {
                const html = document.createElement('div');
                html.innerHTML = `<a href="${post.url}" target="_blank">${post.title}</a>`
                ui.appendChild(html);
            });
        });
    }
}

export default new Lodestone();