class SignalingSystem {
    constructor({
        id = null,
        source = '',
        title = '',
        days = 7,
        population = 100000,
        thresholds= []
    }) {
        this.id = id;
        this.source = source;
        this.title = title;
        this.days = days;
        this.population = population;
        this.thresholds = thresholds;
    }
}

export default SignalingSystem;