import canvasTools from "@/tools/canvas";
import store from "@/store/store";
import thresholdTools from '@/tools/thresholds';
import changeTools from '@/tools/change';
import numberTools from '@/tools/number';

const imageScale = 1;
const width = 1014 * imageScale;
const height = 570 * imageScale;

export const downloadImage = async(view, mapType) => {
    let string;
    const canvas = prepare();
    const ctx = canvas.getContext("2d");
    await addHead(ctx, mapType);
    if (mapType === "cumulative") {
        string = getDateString(view.offsetStart) + " - " + getDateString(view.offset);
    } else {
        string = getDateString(view.offsetStart)
    }
    addCustomText(ctx, string, 0.03, 0.195);
    canvasTools.draw(ctx, view.currentSource, store.getters['ui/regions'], getSettings(view,1), view, mapType);
    addCreator(ctx);
    addLegend(ctx, mapType, store.state.settings.gradient, 0.03, 0.28, view.currentSource);
    finish(canvas);
}


const prepare = () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'image-for-download';
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

const finish = (canvas) => {
    const fileName = 'corona-status';
    const downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', fileName);
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', url);
        downloadLink.click();
    });
}

const getSettings = (view, i) => {
    return {
        width: width,
        height: height,
        shiftX: (220 * imageScale),
        shiftY: 0,
        zoom: store.state.maps.current.settings.map.zoom * 550 * imageScale,
        key: 'download-compare-' + i,
        fill: true
    }
}

const getDateString = (offset) => {
    return store.getters['ui/getDateByOffset'](offset, 'EEEEEE d MMM yyyy', store.state.languages.current.iso_code);
}

const addHead = (ctx, mapType) => {
    return new Promise((resolve, reject) => {
        canvasTools.addBackground(ctx, width, height);
        const img = new Image();
        switch (mapType) {
            case "change":
                img.src = 'assets/img/corona-change.png';
                break;
            default:
                img.src = 'assets/img/corona-signaling.png';
        }
        img.onload = () => {
            const width = 559 * imageScale;
            const height = 57 * imageScale;
            const x = 30 * imageScale;
            const y = 36 * imageScale;
            ctx.drawImage(img, x, y, width, height);
            resolve();
        }
    });
}

const addCustomText = (ctx, text, x, y) => {
    let xAbs, yAbs;
    xAbs = x * width;
    yAbs = y * height;
    ctx.font = 'bold ' + (32 * imageScale) + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText(text, xAbs, yAbs);
}

const addLegend = (ctx, mapType, gradient, x, y, source) => {
    let baseX, baseY;
    baseX = x * width;
    baseY = y * height;
    ctx.strokeStyle = '#555';
    switch (mapType) {
        case "change":
            addLegendChange(ctx, baseX, baseY);
            break;
        case "signaling":
            ctx.font = (12 * imageScale) + 'px Arial';
            if (gradient) {
                addLegendSignalingGradient(ctx, baseX, baseY, source);
            } else {
                addLegendSignaling(ctx, baseX, baseY, source);
            }
            break;
        default:
            //
            break;
    }
}

const addLegendSignalingGradient = (ctx, baseX, baseY, source) => {
    let index, thresholds, y, width, height, margin;
    height = 20 *  imageScale;
    margin = imageScale;
    width = 16 *  imageScale;
    y = baseY;
    index = 0;
    thresholds = thresholdTools.getThresholds(source);
    for (let threshold of thresholds) {
        let color1, color2, grd, label;
        color1 = threshold.color[store.state.ui.color];
        if (index === 0 || index === thresholds.length - 1) {
            ctx.fillStyle = color1;
        } else {
            color2 = thresholds[index + 1].color[store.state.ui.color];
            grd = ctx.createLinearGradient(0, y, 0, (y + height));
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
        }
        ctx.fillRect(baseX, y, width, height);

        ctx.fillStyle = '#544e41';
        if (threshold.label) {
            label = threshold.label;
        } else {
            label = thresholdTools.getNumber(threshold, source);
        }
        ctx.fillText(label, baseX + width + (8 * imageScale), (y + (18 * imageScale)));
        y += (height + margin);
        index++;
    }
}

const addLegendSignaling = (ctx, baseX, baseY, source) => {
    baseX += 8;
    for (let threshold of thresholdTools.getThresholds(source)) {
        let label;
        ctx.fillStyle = threshold.color[store.state.ui.color];
        ctx.beginPath();
        ctx.arc(baseX, baseY, (9 * imageScale), 0, (Math.PI * 2), false);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = '#544e41';
        if (threshold.label) {
            label = threshold.label;
        } else {
            label = thresholdTools.getNumber(threshold, source);
        }
        ctx.fillText(label, baseX + (24 * imageScale), (baseY + (7 * imageScale)));
        baseY += (24 * imageScale);
    }
}

const addLegendChange = (ctx, baseX, baseY) => {
    let index, y;
    ctx.font = (12 * imageScale) + 'px Arial';
    index = 0;
    y = baseY;
    for (let section of changeTools.sections) {
        let colors, grd, height, change, value;
        height = index === 1 ? (18 *  imageScale): (36 *  imageScale);
        colors = changeTools.getBackgroundForSection(index);
        grd = ctx.createLinearGradient(0, y, 0, (y + height));
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.fillRect(baseX, y, (18 *  imageScale), height);
        ctx.strokeRect(baseX, y, (18 *  imageScale), height);

        // text top
        change = changeTools.getChangeForFactor(section.range[0]);
        value = numberTools.formatChange(change);
        ctx.fillStyle = '#544e41';
        ctx.fillText(value, baseX + (24 * imageScale), y + (6 * imageScale));
        if (index === changeTools.sections.length - 1) {
            change = changeTools.getChangeForFactor(section.range[1]);
            value = numberTools.formatChange(change);
            ctx.fillStyle = '#544e41';
            ctx.fillText(value, baseX + (24 * imageScale), y + height + (2 * imageScale));
        }

        index++;
        y += (height - 1);
    }
}

const addCreator = (ctx) => {
    ctx.font = (20 * imageScale) + 'px Arial';
    ctx.fillStyle = '#544e41';
    ctx.fillText('Created by: @innouveau', (30 * imageScale),  (545 * imageScale));
}
