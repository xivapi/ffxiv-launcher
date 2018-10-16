import Settings from "./Settings";
import XIVAPI from "./XIVAPI";

/**
 * Show lodestone info
 */
class Lodestone
{
    init()
    {
        this.fetchNews();
    }

    fetchNews()
    {
        XIVAPI.getLodestoneData(response => {
            // your html here, you can append to your html view
            console.log(response.News);

            const ui = document.getElementById('lodestone-news-view-id-thingy');

            for(let i in response.News) {
                let post = response.News[i];

                let html = `
                    <div>${post.Title}</div>
                `;

                ui.appendChild(row);
            }
            
        });
    }
}

export default new Lodestone();