function init() {
    elHorse = document.querySelector('.horse');
    elWorld = document.querySelector('.world');

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    setWorldSize();

    elCanvas = document.querySelector('.canvas');

    elCanvas.width = elCanvas.clientWidth;
    elCanvas.height = elCanvas.clientHeight;

    ctx = elCanvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    loadImage('./images/gnome-walk-sheet.gif', 'gnomeWalk');
    loadImage('./images/gnome-stand.gif', 'gnomeStand');
    loadImage('./images/campfire-sheet.gif', 'campfire');
    loadImage('./images/wall-sheet.gif', 'wall');
    loadImage('./images/coinflower.gif', 'coinflower');
    loadImage('./images/base-sheet.gif', 'base');
    loadImage('./images/wave.gif', 'wave');
    loadImage('./images/evil-wall.gif', 'evilWall');

    darknessLayer();

    addEntities();

    horseMove(0, 1);

    elHorse.coins = 0;
    elHorse.active = true;
    elHorse.targetable = true;

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    // fade in after first tick positioning flash
    document.body.classList.add('loaded', 'unlit');

    update();

    document.addEventListener('keydown', event => {
        let elKeys = document.querySelector('.keys');

        if (event.which === 37 || event.which === 39) {
            setTimeout(() => {
                elKeys.classList.add('hide');
            }, 4000);

            setTimeout(() => {
                elKeys.classList.add('out');
            }, 5000);
        }
    });
}

function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;
    worldHeight = elWorld.clientHeight;
    uWorldHeight = elWorld.clientHeight / unit;

    elWorld.x = -125 * unit;

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;
}
