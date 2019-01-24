class Notice
{
    constructor()
    {
        this.$notice = $('.notice');
        this.$noticeFade = $('.notice-fade');

        // hide the notice on click (anywhere)
        this.$noticeFade.on('click', event => {
            this.hide();
        })
    }

    show(message)
    {
        this.$notice.html(message);
        this.$notice.addClass('open');
        this.$noticeFade.addClass('open');
    }

    hide()
    {
        this.$notice.removeClass('open');
        this.$noticeFade.removeClass('open');
    }
}

export default new Notice();
