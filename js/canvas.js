function draw(thing, frame, offset = 0, offsetY, context) {
    context = context || ctx;

    if (!thing.sprite && !thing.color) return;

    spriteX = thing.x + elWorld.x + 50 * unit - thing.width / 2 + offset;

    if (spriteX < -thing.width || spriteX > currentWidth + thing.width) return; // off-screen -trouble?

    if (thing.color) return drawRect(thing, spriteX, context);

    //spriteX = thing.x + elWorld.x;
    spriteY = thing.y + (offsetY || 0);

    context.drawImage(
        thing.sprite,
        frame * thing.sW, (thing.sY || 0), thing.sW, thing.sH,
        Math.round(spriteX), spriteY,
        thing.width, thing.height
    );
}

function drawRect(thing, spriteX, context) {
    context = context || ctx;

    if (context.fillStyle !== thing.color) context.fillStyle = thing.color || '#000';

    context.fillRect(Math.round(spriteX), thing.y, thing.width, thing.height);
}

function lightOnScreen(light) {
    return (light > 0 - 4 * unit && light < currentWidth + 4 * unit);
}

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

function loadImage(url, name) {
    var img = new Image();

    img.src = url;

    img.onload = function () {
        images[name] = img;

        if (images.gnomeWalk && !images.flipped) loadImage(flipImage(images.gnomeWalk), 'flipped');
        if (images.gnomeWalk && !images.poor) loadImage(flipImage(images.gnomeWalk, 'grayscale(90%)'), 'poor');
        if (images.gnomeWalk && !images.evil) loadImage(flipImage(images.gnomeWalk, 'brightness(5%)'), 'evil');
        if (images.gnomeWalk && !images.green) loadImage(flipImage(images.gnomeWalk, 'hue-rotate(90deg)'), 'green');
        if (images.gnomeWalk && !images.blue) loadImage(flipImage(images.gnomeWalk, 'hue-rotate(220deg)'), 'blue');

        if (images.evil && !images.evilRich) loadImage(flipImage(images.evil, null, true), 'evilRich');

        if (images.campfire && !images.evilCampfire) loadImage(flipImage(images.campfire, 'brightness(5%)', null, 20, 4), 'evilCampfire');
        if (images.wave && !images.wave1) loadImage(flipImage(images.wave, null, null, 25, 4, false), 'wave1');
        if (images.wave1 && !images.wave2) loadImage(flipImage(images.wave1, null, null, 250, 40, true), 'wave2');
        if (images.coinflower && !images.cointree) loadImage(flipImage(images.coinflower, 'hue-rotate(90deg)', null, 6, 7, true), 'cointree');
    };
}

function flipImage(image, filter, coined, w, h, wave) {
    var m_canvas = document.createElement('canvas');

    m_canvas.width = w || 14;
    m_canvas.height = h || 11;

    var m_context = m_canvas.getContext('2d');

    m_context.translate(w || 14, 0);
    m_context.scale(-1, 1);

    m_context.filter = filter;

    m_context.drawImage(image, 0, 0);

    if (wave) images.waveP = m_context.createPattern(image, 'repeat');

    if (coined) {
        m_context.fillStyle = '#FFFF00';
        m_context.fillRect(1, 5, 4, 5);

        m_context.fillRect(8, 5, 4, 5);
    }

    return m_canvas.toDataURL();
}

/*
function createTransformed(image, w, h, transformFn) {
    var m_canvas = document.createElement('canvas');

    m_canvas.width = w;
    m_canvas.height = h;

    var m_context = m_canvas.getContext('2d');

    transformFn(m_context);

    m_context.drawImage(image, 0, 0);

    return m_canvas.toDataURL();
}
*/

function darknessLayer() {
    darknessCanvas = document.createElement('canvas');
    darknessCanvas.width =  elCanvas.clientWidth;
    darknessCanvas.height = elCanvas.clientHeight;

    darknessCtx = darknessCanvas.getContext('2d');

    darknessCtx.imageSmoothingEnabled = false;

    document.body.appendChild(darknessCanvas);
}
