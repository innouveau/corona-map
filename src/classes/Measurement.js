import store from '@/store/store';
import dateTools from '@/tools/date';

class Measurement {
    constructor({
        date = '',
        RNA_per_ml = 0,
        representative_measurement = false
    }) {
        this.date = date;
        this.dateInMs = new Date(date).getTime();
        this.dateOffset = dateTools.getDateOffset(store.state.ui.todayInMs, this.dateInMs);
        this.RNA_per_ml = RNA_per_ml;
        console.log(representative_measurement);
        this.representative_measurement = representative_measurement;
    }
}

export default Measurement;