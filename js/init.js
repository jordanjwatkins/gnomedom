function init() {
    setWorldSize();

    initCanvas();

    loadImages();

    darknessLayer();

    initHorse();

    addEntities();

    update();

    initInput();

    loadGeneratedImages();

    // fade in after first tick positioning flash
    document.body.classList.add('loaded', 'unlit');
}

function initCanvas() {
    elCanvas = document.querySelector('canvas');

    elCanvas.width = elCanvas.clientWidth;
    elCanvas.height = elCanvas.clientHeight;

    ctx = elCanvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;
}

function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;

    elWorld = elWorld || document.querySelector('.world');

    worldHeight = elWorld.clientHeight;
    uWorldHeight = elWorld.clientHeight / unit;

    elWorld.x = -125 * unit;
}

function loadImages() {
    loadImage('./images/gnome-walk-sheet.gif', 'gnomeWalk');
    loadImage('./images/gnome-stand.gif', 'gnomeStand');
    loadImage('./images/campfire-sheet.gif', 'campfire');
    loadImage('./images/wall-sheet.gif', 'wall');
    loadImage('./images/coinflower.gif', 'coinflower');
    loadImage('./images/base-sheet.gif', 'base');
    loadImage('./images/wave.gif', 'wave');
    loadImage('./images/evil-wall.gif', 'evilWall');
}

function loadGeneratedImages() {
    if (images.gnomeWalk && !images.flipped) loadImage(flipImage(images.gnomeWalk), 'flipped');
    if (images.gnomeWalk && !images.poor) loadImage(flipImage(images.gnomeWalk, 'grayscale(90%)'), 'poor');
    if (images.gnomeWalk && !images.evil) loadImage(flipImage(images.gnomeWalk, 'brightness(5%)'), 'evil');
    if (images.gnomeWalk && !images.green) loadImage(flipImage(images.gnomeWalk, 'hue-rotate(90deg)'), 'green');
    if (images.gnomeWalk && !images.blue) loadImage(flipImage(images.gnomeWalk, 'hue-rotate(220deg)'), 'blue');

    if (images.evil && !images.evilRich) loadImage(flipImage(images.evil, null, true), 'evilRich');
    if (images.campfire && !images.evilCampfire) loadImage(flipImage(images.campfire, 'brightness(5%)', null, 20, 4), 'evilCampfire');
    if (images.wave && !images.wave1) loadImage(flipImage(images.wave, null, null, 25, 4, false), 'wave1');
    if (images.wave1 && !images.wave2) loadImage(flipImage(images.wave1, null, null, 250, 40, true), 'wave2');
    if (images.coinflower && !images.cointree) loadImage(flipImage(images.coinflower, 'hue-rotate(60deg)', null, 6, 7, true), 'cointree');
    if (images.coinflower && !images.cointree2) loadImage(flipImage(images.coinflower, 'hue-rotate(90deg)', null, 6, 7, true), 'cointree2');
}
