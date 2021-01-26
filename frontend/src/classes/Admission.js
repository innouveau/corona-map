class Admission {
    constructor({
        date = '',
        n = 0
    }) {
        this.date = date;
        this.n = n;
    }

    get getTime() {
        return new Date(this.date).getTime();
    }
}

export default Admission;