class Story {
    constructor({
        id = null,
        title = '',
        chapters = []
    }) {
        this.id = id;
        this.title = title;
        this.chapters = chapters;
    }
}

export default Story;