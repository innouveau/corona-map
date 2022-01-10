import canvasTools from "@/tools/canvas";

export const downloadImage = (payload, mapType) => {
    // todo
    console.log("download");
    // prepair();
    // addHead().then(() => {
    //     this.addDate(this.view, 0.03, 0.195);
    //     canvasTools.draw(payload.ctx, payload.view.currentSource, payload.regions, this.getSettings(1), payload.view, mapType);
    //     // canvasTools.draw(payload.ctx, payload.view.currentSource, payload.regions, this.getSettings(1), this.view, mapType);
    //     addCreator(payload);
    //     addLegend(mapType, true, 0.03, 0.28, payload.view.currentSource);
    //     finish();
    // });
}

const typeLabel = () => {
    return '-' + this.getDateStringdashes(this.view);
}

const getSettings = (i) => {
    return {
        width: this.width,
        height: this.height,
        shiftX: (220 * this.imageScale),
        shiftY: 0,
        zoom: this.currentMap.settings.map.zoom * 550 * this.imageScale,
        key: 'download-compare-' + i,
        fill: true
    }
}

const getDateStringdashes = (view) => {
    const date = this.getDateString(view).toLowerCase().replace(/\./g,'');
    return date.replace(/\s/g , "-");
}

const getDateString = (view) => {
    return this.$store.getters['ui/getDateByOffset'](view.offset * this.currentMap.data.positivePcrTests.interval, 'EEEEEE d MMM yyyy', this.currentLanguage.iso_code);
}

const prepair = (width = this.width, height = this.height) => {
    this.canvas.id = 'image-for-download';
    this.canvas.width = width;
    this.canvas.height = height;

    canvasTools.addBackground(this.ctx, width, height);
}

const addHead = () => {
    let width, height;
    width = 559 * this.imageScale;
    height = 57 * this.imageScale;
    return new Promise((resolve, reject) => {
        let img = new Image();
        if (this.mapType === 'change') {
            img.src = 'assets/img/corona-change.png';
        } else {
            img.src = 'assets/img/corona-signaling.png';
        }
        img.onload = () => {
            this.ctx.drawImage(img, (30 * this.imageScale), (36 * this.imageScale), width, height);
            resolve();
        }
    });
}

const addDate = (view, x, y, addLine = true) => {
    let date = this.getDateString(view);
    this.addCustomText(date, x, y);
}

const addCustomText = (text, x, y) => {
    let ctx, xAbs, yAbs;
    ctx = this.ctx;
    xAbs = x * this.width;
    yAbs = y * this.height;
    ctx.font = 'bold ' + (32 * this.imageScale) + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText(text, xAbs, yAbs);
}

const addLegend = (mapType, gradient, x, y, source) => {
    let baseX, baseY, ctx;
    ctx = this.ctx;
    baseX = x * this.width;
    baseY = y * this.height;
    ctx.strokeStyle = '#555';
    if (mapType === 'change') {
        this.addLegendChange(baseX, baseY);
    } else {
        ctx.font = (12 * this.imageScale) + 'px Arial';
        if (gradient) {
            this.addLegendSignalingGradient(baseX, baseY, source);
        } else {
            this.addLegendSignaling(baseX, baseY, source);
        }
    }
}

const addLegendSignalingGradient = (baseX, baseY, source) => {
    let ctx, index, thresholds, y, width, height, margin;
    height = 20 *  this.imageScale;
    margin = this.imageScale;
    width = 16 *  this.imageScale;
    y = baseY;
    ctx = this.ctx;
    index = 0;
    thresholds = thresholdTools.getThresholds(source);
    for (let threshold of thresholds) {
        let color1, color2, grd, label;
        color1 = threshold.color[this.$store.state.ui.color];
        if (index === 0 || index === thresholds.length - 1) {
            ctx.fillStyle = color1;
        } else {
            color2 = thresholds[index + 1].color[this.$store.state.ui.color];
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
        ctx.fillText(label, baseX + width + (8 * this.imageScale), (y + (18 * this.imageScale)));
        y += (height + margin);
        index++;
    }
}

const addLegendSignaling = (baseX, baseY, source) => {
    let ctx = this.ctx;
    baseX += 8;
    for (let threshold of thresholdTools.getThresholds(source)) {
        let label;
        ctx.fillStyle = threshold.color[this.$store.state.ui.color];
        ctx.beginPath();
        ctx.arc(baseX, baseY, (9 * this.imageScale), 0, (Math.PI * 2), false);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = '#544e41';
        if (threshold.label) {
            label = threshold.label;
        } else {
            label = thresholdTools.getNumber(threshold, source);
        }
        ctx.fillText(label, baseX + (24 * this.imageScale), (baseY + (7 * this.imageScale)));
        baseY += (24 * this.imageScale);
    }
}

const addLegendChange = (baseX, baseY) => {
    let ctx, index, y;
    ctx = this.ctx;
    ctx.font = (12 * this.imageScale) + 'px Arial';
    index = 0;
    y = baseY;
    for (let section of changeTools.sections) {
        let colors, grd, height, change, value;
        height = index === 1 ? (18 *  this.imageScale): (36 *  this.imageScale);
        colors = changeTools.getBackgroundForSection(index);
        grd = ctx.createLinearGradient(0, y, 0, (y + height));
        grd.addColorStop(0, colors[0]);
        grd.addColorStop(1, colors[1]);
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.fillRect(baseX, y, (18 *  this.imageScale), height);
        ctx.strokeRect(baseX, y, (18 *  this.imageScale), height);

        // text top
        change = changeTools.getChangeForFactor(section.range[0]);
        value = numberTools.formatChange(change);
        ctx.fillStyle = '#544e41';
        ctx.fillText(value, baseX + (24 * this.imageScale), y + (6 * this.imageScale));
        if (index === changeTools.sections.length - 1) {
            change = changeTools.getChangeForFactor(section.range[1]);
            value = numberTools.formatChange(change);
            ctx.fillStyle = '#544e41';
            ctx.fillText(value, baseX + (24 * this.imageScale), y + height + (2 * this.imageScale));
        }

        index++;
        y += (height - 1);
    }
}

const addCreator = (p) => {
    let ctx = this.ctx;
    ctx.font = (20 * this.imageScale) + 'px Arial';
    ctx.fillStyle = '#544e41';
    ctx.fillText('Created by: @innouveau', (30 * this.imageScale),  (545 * this.imageScale));
}

const finish = (name) => {
    return new Promise((resolve, reject) => {
        let fileName;
        if (name && name.length > 0) {
            fileName = name;
        } else {
            fileName = 'corona-status' + this.typeLabel;
        }
        this.downloadLink.setAttribute('download', fileName);
        this.canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob);
            this.downloadLink.setAttribute('href', url);
            this.downloadLink.click();
            resolve();
        });
    })
}
