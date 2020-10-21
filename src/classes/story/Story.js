import Chapter from '@/classes/story/Chapter';

class Story {
    constructor({
        id = null,
        title = '',
        hasAgeGroups = false,
        chapters = []
    }) {
        this.id = id;
        this.title = title;
        this.hasAgeGroups = hasAgeGroups;
        this.chapters = chapters.map(c => new Chapter(c));
    }
}

export default Story;