function init() {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');
    elNightLayer = document.querySelector('.night-layer');

    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    window.addEventListener('resize', resizeAll);

    setWorldSize();

    elCanvas = document.querySelector('.canvas');

    elCanvas.width = elCanvas.clientWidth;
    elCanvas.height = elCanvas.clientHeight;

    ctx = elCanvas.getContext('2d');

    ctx.imageSmoothingEnabled = false;

    images.gnomeWalk = loadImage('./images/gnome-walk-sheet.gif', 'gnomeWalk');
    images.gnomeStand = loadImage('./images/gnome-stand.gif', 'gnomeStand');

    images.campfire = loadImage('./images/campfire-sheet.gif', 'campfire');

    images.horse = loadImage('./images/horse-sheet.gif', 'horse');
    images.wall = loadImage('./images/wall-sheet.gif', 'wall');

    darknessLayer();

    addEntities();

    horseMove(0, 1);

    elHorse.coins = 15;

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    // fade in after first tick positioning flash
    document.body.classList = 'loaded';

    update();
}

function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;
    worldHeight = elWorld.clientHeight;
    uWorldHeight = elWorld.clientHeight / unit;

    elWorld.x = (resizeDelta) ? elWorld.x / resizeDelta : 50 * unit;

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = (resizeDelta) ? elHorse.width / resizeDelta : elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;
}

function addEntities() {
    // test walls
    var thing;

    [-50, 70].forEach(x => {
        thing = addEntity({ x: x, y: uWorldHeight - 13, width: 5, height: 13, things: walls, className: 'wall' });

        thing.maxCoins = 3;
        thing.destroyed = true;

        thing.sW = 5;
        thing.sH = 7;

        thing.levelUp = function () {
            this.health = 10;
            this.destroyed = false;
        };
    });

    // horse
    thing = addEntity({ x: 0, y: uWorldHeight - 8, width: 12.5, height: 10, things: misc, className: 'horse' });

    thing.sW = 5;
    thing.sH = 4;

    // fire
    [11, 270, -270].forEach(x => {
        thing = addEntity({ x: x, y: uWorldHeight - 8, width: 9, height: 8, things: misc, className: 'campfire' });

        thing.sW = 5;
        thing.sH = 4;

        thing.maxCoins = 3;
        thing.burning = false;

        thing.levelUp = function () {
            this.burning = true;
        };
    });

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
        thing.moveType = 'walking';
        thing.speed = unit / 4;
    }

    // camp
    addCamp(-190);

    // village gnomes
    addGnome(-40);
    addGnome(20);
}
