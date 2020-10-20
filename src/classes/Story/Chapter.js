class Chapter {
    constructor({
        title = '',
        date = '',
        dateTitle = '',
        city_title = '',
        content = ''
    }) {
        this.title = title;
        this.date = date;
        this.dateTitle = dateTitle;
        this.city_title = city_title;
        this.content = content;
    }
}

export default Chapter;