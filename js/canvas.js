function updateCanvas() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);
    cutoutGradient(150, 120, 50);
    cutoutGradient(30, 120, 50);
}

function lightenGradient(x, y, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighten';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0.0, '#BB9');
    radialGradient.addColorStop(0.2 + rnd, '#AA8');
    radialGradient.addColorStop(0.7 + rnd, '#330');
    radialGradient.addColorStop(0.90, '#110');
    radialGradient.addColorStop(1, '#000');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}

function cutoutGradient(x, y, radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    radialGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
