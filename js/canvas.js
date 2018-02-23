function clearCanvases() {
    ctx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);
    darknessCtx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);
}

function draw(thing, frame, offset = 0, offsetY, context) {
    context = context || ctx;

    if (!thing.sprite && !thing.color) return;

    spriteX = thing.x + elWorld.x + 50 * unit - thing.width / 2 + offset;

    if (spriteX < -thing.width || spriteX > currentWidth + thing.width) return; // off-screen

    if (thing.color) return drawRect(thing, spriteX, context);

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

function loadImage(url, name) {
    var img = new Image();

    img.src = url;

    img.onload = function () {
        images[name] = img;
    };
}

function flipImage(image, filter, coined, w, h, wave) {
    var tmpCanvas = document.createElement('canvas');
    var tmpContext = tmpCanvas.getContext('2d');

    tmpCanvas.width = w || 14;
    tmpCanvas.height = h || 11;

    tmpContext.translate(w || 14, 0);
    tmpContext.scale(-1, 1);

    tmpContext.filter = filter;

    tmpContext.drawImage(image, 0, 0);

    if (wave) images.waveP = tmpContext.createPattern(image, 'repeat');

    if (coined) {
        tmpContext.fillStyle = '#FFFF00';

        tmpContext.fillRect(1, 5, 4, 5);
        tmpContext.fillRect(8, 5, 4, 5);
    }

    return tmpCanvas.toDataURL();
}
