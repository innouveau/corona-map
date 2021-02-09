class Language {
    constructor({
        id = null,
        name = '',
        iso_code = ''
    }) {
        this.id = id;
        this.name = name;
        this.iso_code = iso_code;
    }
}

export default Language;