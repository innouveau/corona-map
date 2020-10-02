import store from '@/store/store';
import interpolate from "color-interpolate";
import translateTool from '@/tools/translate';





const getThreshold = function(cases, population, days) {
    let signalingSystem = store.state.signalingSystems.current;
    if (cases === null || population === null) {
        return null;
    } else {
        let relativeCasesInPeriod = signalingSystem.population * cases / population * (signalingSystem.days / days);

        for (let threshold of signalingSystem.thresholds) {
            if ((relativeCasesInPeriod < threshold.n) || (relativeCasesInPeriod === 0 && threshold.n === 0)) {
                return threshold;
            }
        }
    }
};

const getNumber = function(threshold) {
    let index, signalingSystem, text;
    signalingSystem = store.state.signalingSystems.current;
    index = signalingSystem.thresholds.indexOf(threshold);
    if (index === 0) {
        if (threshold.n === 0) {
            text = '0';
        } else {
            text = '0 - ' + threshold.n;
        }
    } else if (threshold.n !== Infinity) {
        let prev = signalingSystem.thresholds[index - 1];
        text = prev.n + ' - ' + threshold.n;
    } else {
        text = signalingSystem.thresholds[signalingSystem.thresholds.length - 2].n + ' ' + translateTool.translate('or-mor');
    }
    if (index === 0) {
        text += ' ' + translateTool.translate('positive-tests').toLowerCase() + ' ' + translateTool.translate('per') + ' ';
        text += getNiceNumberForPopulation(signalingSystem.population) + ' ';
        text += translateTool.translate('inhabitants') + ' ' + translateTool.translate('per') + ' ';
        text += getNiceNumberForDays(signalingSystem.days);
    }
    return text;
};

const getNiceNumberForDays = function(days) {
    if (days === 7) {
        return 'week';
    } else if (days === 1) {
        return 'dag';
    }
};

const getNiceNumberForPopulation = function(number) {
    if (number === 100000) {
        return '100.000';
    }
};

const getThresholds = function() {
    return store.state.signalingSystems.current.thresholds;
};

const _prevThreshold = function(threshold) {
    let index = getThresholds().indexOf(threshold);
    if (index > 0) {
        return getThresholds()[index - 1];
    } else {
        return null;
    }
};

const _nextThreshold = function(threshold) {
    let index = getThresholds().indexOf(threshold);
    if (index < getThresholds().length - 1) {
        return getThresholds()[index + 1];
    } else {
        return null;
    }
};

const thresholdToColor = function(threshold, cases) {
    if (!threshold) {
        return '#888';
    } else {
        if (!store.state.settings.gradient) {
            return threshold.color[store.state.ui.color];
        } else {
            let prev, next;
            prev = _prevThreshold(threshold);
            next = _nextThreshold(threshold);
            if (!prev || !next) {
                return threshold.color[store.state.ui.color];
            } else {
                let colormap, maxOfNextColor, ratio;
                maxOfNextColor = 0.65;
                ratio = maxOfNextColor * (cases - prev.n) / (threshold.n - prev.n);
                colormap = interpolate([threshold.color[store.state.ui.color], next.color[store.state.ui.color]]);
                return colormap(ratio);
            }
        }
    }
};

export default {
    getThreshold,
    getNumber,
    getThresholds,
    thresholdToColor
}