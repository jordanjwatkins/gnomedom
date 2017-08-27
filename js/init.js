function init() {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    window.addEventListener('resize', resizeAll);

    setWorldSize();

    horseMove(0, 1);

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    // fade in after first tick positioning flash
    document.body.classList = 'loaded';

    addEntities();

    update();
}

function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;
    worldHeight = elWorld.clientHeight;
    uWorldHeight = elWorld.clientHeight / unit;

    elWorld.x = (resizeDelta) ? elWorld.x / resizeDelta : 25 * unit;

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = (resizeDelta) ? elHorse.width / resizeDelta : elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;
}

function addEntities() {
    // test wall
    var thing = addEntity({ x: -50, y: elWorld.clientHeight / unit - 13, width: 4, height: 13, things: walls, className: 'wall' });

    thing.health = 10;

    roundedMove(thing);

    // fire
    thing = addEntity({ x: -30, y: elWorld.clientHeight / unit - 8, width: 9, height: 8, things: misc, className: 'campfire dead' });

    thing.coins = 0;
    thing.maxCoins = 5;

    roundedMove(thing);

     // evil fire
    thing = addEntity({ x: -70, y: elWorld.clientHeight / unit - 8, width: 10, height: 8, things: misc, className: 'evil-campfire dead 2' });

    thing.coins = 0;
    thing.maxCoins = 1;

    roundedMove(thing);

    // camp
    addCamp(-90);
}