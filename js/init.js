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

    ctx['imageSmoothingEnabled'] = false;

    loadImage('./images/gnome-walk-sheet.gif', 'gnomeWalk');
    loadImage('./images/gnome-stand.gif', 'gnomeStand');
    loadImage('./images/campfire-sheet.gif', 'campfire');
    loadImage('./images/wall-sheet.gif', 'wall');
    loadImage('./images/coinflower.gif', 'coinflower');
    loadImage('./images/base-sheet.gif', 'base');
    loadImage('./images/wave.gif', 'wave');

    darknessLayer();

    addEntities();

    horseMove(0, 1);

    elHorse.coins = 30;
    elHorse.active = true;

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    // fade in after first tick positioning flash
    document.body.classList.add('loaded');

    update();
}

function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;
    worldHeight = elWorld.clientHeight;
    uWorldHeight = elWorld.clientHeight / unit;

    elWorld.x = -90 * unit;

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;
}

function addEntities() {
    // walls
    var thing;

    [-50, 70].forEach(x => {
        thing = addEntity({ x: x, y: uWorldHeight - 13, width: 5, height: 13, things: walls, className: 'wall' });

        thing.maxCoins = 3;
        thing.destroyed = true;

        thing.sW = 5;
        thing.sH = 7;

        thing.levelUp = function () {
            this.health = 30;
            this.destroyed = false;
        };
    });

    // main fire
    thing = fire(11, 9, 8);
    thing.maxCoins = 3;
    thing.radius = 29 * unit;
    thing.intensity = 1;
    thing.burning = false;

    thing.levelUp = function () {
        this.level++;

        this.sated = false;
        this.burning = true;
        this.coins = 0;

        if (this.level === 1) {
            fireLit = true;

            this.maxCoins = 9;

            // red berry
            thing = addEntity({ x: -20, y: uWorldHeight - 14, width: 5, height: 5 });

            thing.maxCoins = 1;

            thing.levelUp = function () {
                this.y = this.y + 4 * unit;
            };

            thing.color = '#5C0000';

            berries.push(thing);

            // blue berry
            thing = addEntity({ x: 40, y: uWorldHeight - 14, width: 5, height: 5 });

            thing.maxCoins = 1;

            thing.levelUp = function () {
                this.y = this.y + 4 * unit;
            };

            thing.color = '#200E4F';

            berries.push(thing);
        }

        if (this.level === 2) this.maxCoins = 10;
        if (this.level === 3) addGnome(40, null, 124, 131.5); // gnomezilla
    };

    // camp
    addCamp(-190);

    // village gnomes
    addGnome(-40);
    addGnome(20);

    coinFlower(-10);
    coinFlower(30);

    // dead-end
    addEntity({ x: 144, width: 13, height: 22, things: misc, className: 'bush' });
    addEntity({ x: 145, width: 10, height: 20, things: misc }).color = '#333';
    coinFlower(130);

    // water
    addEntity({ x: 181, y: uWorldHeight, width: 60, height: 10, things: misc, className: 'water' }).color = '#2500FF'; // water

    addEntity({ x: 158, y: uWorldHeight - 1, width: 15, height: 1, things: misc, className: 'wave1' });
    addEntity({ x: 172, y: uWorldHeight - 1, width: 15, height: 1, things: misc, className: 'wave1' });
    addEntity({ x: 217, y: uWorldHeight - 1, width: 15, height: 1, things: misc, className: 'wave1' });

    coinFlower(145, 29);

    // evil fire
    thing = fire(-269, 13, 17);
    thing.evil = true;

    coinFlower(-293);

    // spawn evils
    let evils = 0;

    spawn();

    thing.spawner = setInterval(spawn, 4000);

    function spawn() {
        if (!(hour > 18.5 || hour < 5)) return evils = 0;
        if (evils >= days - 1) return;

        console.log('spawn');

        evils++;

        thing = addGnome(-269);
        thing.filter = 'evil';
        thing.moveType = 'walking';
        thing.speed = unit / 1.8;

        // avoid evil not appearing when horse is over fire during spawn
        let t = thing;

        t.leftHome = false;

        setTimeout(function () {
            t.leftHome = true;
            if (days > 4) spawn();
        }, 500);
    }

    // coins bar
    coinBar = addEntity({ x: 2, y: 2, width: 15, height: 2, className: 'bar' });
    coinBar.color = '#444';

    coinValue = addEntity({ x: 2, y: 2, width: 15, height: 2, className: 'bar' });
    coinValue.color = '#ffff00';
}

function fire(x, width, height, type) {
    thing = addEntity({ x, width, height, className: 'campfire' });

    thing.sW = 5;
    thing.sH = 4;

    thing.burning = true;
    thing.radius = 13 * unit;
    thing.intensity = 0.5;

    return thing;
}

