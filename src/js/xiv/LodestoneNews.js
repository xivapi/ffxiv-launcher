import XIVAPI from "./XIVAPI";
const moment = require("moment");

/**
 * Lodestone News
 */
class LodestoneNews
{
    constructor()
    {
        this.news = null;
        this.$view = $('.lodestone-news');
        this.open = true;
    }

    showNews()
    {
        this.open = true;
        this.$view.html('');

        if (this.news) {
            this.showNewsRender(this.news);
            return;
        }

        XIVAPI.getLodestoneData(response => {
            this.news = response;
            this.showNewsRender(response);
        });
    }

    showNewsRender(response)
    {
        this.$view.addClass('open');

        for(let i in response.News) {
            const news = response.News[i];
            const time = moment(news.Time * 1000).format("dddd, MMMM Do YYYY");;

            this.$view.append(`
                    <div>
                        <div><img src="${news.Banner}"></div>
                        <div>
                            <h2>${news.Title}</h2>
                            <small>${time}</small>
                        </div>
                    </div>
                `);

            if (i > 8) {
                break;
            }
        }
    }

    hideNews()
    {
        this.open = false;
        this.$view.removeClass('open');
    }
}

export default new LodestoneNews();
