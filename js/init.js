function init() {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');
    elNightLayer = document.querySelector('.night-layer');

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    window.addEventListener('resize', resizeAll);

    setWorldSize();

    horseMove(0, 1);

    elHorse.coins = 15;

    console.log(elHorse.coins);

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
    var thing = addEntity({ x: -90, y: uWorldHeight - 13, width: 5, height: 13, things: walls, className: 'wall unbuilt' });

    thing.health = 10;
    thing.maxCoins = 3;
    thing.destroyed = true;

    thing.levelUp = function () {
        this.classList.remove('unbuilt', 'destroyed');
        this.destroyed = false;
    };

    thing = addEntity({ x: 30, y: uWorldHeight - 13, width: 5, height: 13, things: walls, className: 'wall unbuilt' });

    thing.health = 10;
    thing.maxCoins = 3;

    thing.levelUp = function () {
        this.classList.remove('unbuilt', 'destroyed');
        this.destroyed = false;
    };

    // fire
    thing = addEntity({ x: -30, y: uWorldHeight - 8, width: 9, height: 8, things: misc, className: 'campfire dead' });

    thing.maxCoins = 3;

    // evil fire (lvl 2?)
    thing = addEntity({ x: -270, y: uWorldHeight - 8, width: 10, height: 8, things: misc, className: 'evil-campfire' });

    thing.coins = 0;
    thing.maxCoins = 4;

    // spawn evils
    let evils = 0;

    spawn();

    thing.spawner = setInterval(spawn, 10000);

    function spawn() {
        if (evils > 5) return;

        console.log('spawn');

        evils++;

        thing = addGnome(-269);
        thing.filter = 'evil';
        thing.style.filter = gFilters[thing.filter];
        thing.moveType = 'walking';
        thing.vX = -120 * unit;
    }

    roundedMove(thing);

    // camp
    addCamp(-190);

    // village gnomes
    addGnome(-40);
    addGnome(20);
}
