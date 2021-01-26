import store from '@/store/store';
import interpolate from "color-interpolate";
import translateTool from '@/tools/translate';





const getThreshold = function(cases, source) {
    let signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
    if (cases === null) {
        return null;
    } else {

        for (let threshold of signalingSystem.thresholds) {
            if ((cases < threshold.n) || (cases === 0 && threshold.n === 0)) {
                return threshold;
            }
        }
    }
};

const getNumber = function(threshold, source) {
    let index, text, signalingSystem;
    signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
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
        text += ' ' + translateTool.translate(source.key, false) + ' ' + translateTool.translate('per') + ' ';
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

const getThresholds = function(source) {
    let signalingSystem = store.getters['signalingSystems/getItemById'](source.signalingSystem_id);
    return signalingSystem.thresholds;
};

const _prevThreshold = function(threshold, source) {
    let index, thresholds;
    thresholds = getThresholds(source);
    index = thresholds.indexOf(threshold);
    if (index > 0) {
        return thresholds[index - 1];
    } else {
        return null;
    }
};

const _nextThreshold = function(threshold, source) {
    let index, thresholds;
    thresholds = getThresholds(source);
    index = thresholds.indexOf(threshold);
    if (index < thresholds.length - 1) {
        return thresholds[index + 1];
    } else {
        return null;
    }
};

const thresholdToColor = function(threshold, cases, source) {
    if (!threshold) {
        return '#888';
    } else {
        if (!store.state.settings.gradient) {
            return threshold.color[store.state.ui.color];
        } else {
            let prev, next;
            prev = _prevThreshold(threshold, source);
            next = _nextThreshold(threshold, source);
            if (!prev || !next) {
                return threshold.color[store.state.ui.color];
            } else {
                let colormap, maxOfNextColor, ratio, signalingSystem;
                maxOfNextColor = 0.65;
                signalingSystem = store.state.signalingSystems.current;
                // the free signaling system has no 'jump'
                if (signalingSystem.id === 4) {
                    maxOfNextColor = 1;
                }
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