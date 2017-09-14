function cutoutGradient(x, y, radius, brightness) {
    darknessCtx.save();
    darknessCtx.globalCompositeOperation = 'destination-out';

    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);

    radius = radius * (1 + rnd);

    var radialGradient = darknessCtx.createRadialGradient(x, y, 0, x, y, radius);

    radialGradient.addColorStop(0, `rgba(255, 0, 0, ${brightness})`);
    radialGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    darknessCtx.fillStyle = radialGradient;

    darknessCtx.beginPath();
    darknessCtx.arc(x, y, radius, 0, 2 * Math.PI);
    darknessCtx.fill();

    darknessCtx.restore();
}

function darken(x, y, w, h, darkenColor, amount) {
    darknessCtx.fillStyle = darkenColor;
    darknessCtx.globalAlpha = amount;
    darknessCtx.fillRect(x, y, w, h);
    darknessCtx.globalAlpha = 1;
}

function darknessLayer() {
    darknessCanvas = document.createElement('canvas');
    darknessCanvas.width =  elCanvas.clientWidth;
    darknessCanvas.height = elCanvas.clientHeight;

    darknessCtx = darknessCanvas.getContext('2d');

    darknessCtx.imageSmoothingEnabled = false;

    document.body.appendChild(darknessCanvas);
}
