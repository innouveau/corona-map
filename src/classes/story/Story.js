import Chapter from '@/classes/story/Chapter';

class Story {
    constructor({
        id = null,
        title = '',
        chapters = []
    }) {
        this.id = id;
        this.title = title;
        this.chapters = chapters.map(c => new Chapter(c));
    }
}

export default Story;