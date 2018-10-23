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
                html.innerHTML = `<a href="${post.url}" onclick="window.open(this.href,'targetWindow', 'toolbar=no, location=no, menubar=yes, scrollbars=yes, resizable=yes, width=1400px, height=900px'); return false;">${post.title}</a>`
                ui.appendChild(html);
            });
        });
    }
}



export default new Lodestone();