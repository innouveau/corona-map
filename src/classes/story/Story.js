import Chapter from '@/classes/story/Chapter';

class Story {
    constructor({
        id = null,
        title = '',
        subtitle = '',
        image = '',
        hasAgeGroups = false,
        chapters = []
    }) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.image = image;
        this.hasAgeGroups = hasAgeGroups;
        this.chapters = chapters.map(c => new Chapter(c));
    }
}

export default Story;