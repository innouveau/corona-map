class Chapter {
    constructor({
        title = '',
        date = '',
        dateTitle = '',
        selection = {},
        content = ''
    }) {
        this.title = title;
        this.date = date;
        this.dateTitle = dateTitle;
        this.selection = selection;
        this.content = content;
    }
}

export default Chapter;