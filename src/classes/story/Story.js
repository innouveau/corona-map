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
        this.chapters = chapters.map(c => new Chapter(c, this));
    }

    getChapterByScroll(scroll) {
        for (let chapter of this.chapters) {
            if (scroll >= chapter.ui.top && scroll < chapter.ui.bottom) {
                return chapter;
            }
        }
        return null;
    }

    getChapterByOffset(offset) {
        for (let chapter of this.chapters) {
            if (chapter.next) {
                if (offset <= chapter.offset && offset > chapter.next.offset) {
                    return chapter;
                }
            } else {
                if (offset <= chapter.offset) {
                    return chapter;
                }
            }
        }
        return null;
    }
}

export default Story;