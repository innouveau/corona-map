import dateTools from "@/tools/date";
import store from "@/store/store";

class Chapter {
    constructor(
        {
            title = "",
            date = "",
            dateTitle = "",
            selection = {},
            content = "",
            ui = {},
        },
        story
    ) {
        this.story = story;
        this.title = title;
        this.date = date;
        this.dateTitle = dateTitle;
        this.selection = selection;
        this.content = content;
        this.ui = {};
    }

    get previous() {
        let index = this.story.chapters.indexOf(this);
        if (index > 0) {
            return this.story.chapters[index - 1];
        } else {
            return null;
        }
    }

    get next() {
        let index = this.story.chapters.indexOf(this);
        if (index < this.story.chapters.length - 1) {
            return this.story.chapters[index + 1];
        } else {
            return null;
        }
    }

    get offset() {
        return dateTools.getOffsetByDate(this.date);
    }

    get offsetBottom() {
        return this.next ? this.next.offset : null;
    }

    getOffsetByScroll(scroll) {
        let percentage, nextChapter;
        percentage = (scroll - this.ui.top) / (this.ui.bottom - this.ui.top);
        nextChapter = this.next;
        if (nextChapter) {
            return (
                this.offset -
                Math.round(percentage * (this.offset - nextChapter.offset))
            );
        } else {
            return this.offset;
        }
    }

    getScrollByOffset(offset) {
        let percentage, nextChapter;
        nextChapter = this.next;
        if (nextChapter) {
            percentage =
                (this.offset - offset) / (nextChapter.offset - this.offset);
            return Math.round(
                this.ui.top + percentage * (this.ui.top - this.ui.bottom)
            );
        } else {
            return this.ui.top;
        }
    }
}

export default Chapter;
