function addEntities() {
    // village
    villageFireAndBase();
    villageWalls();

    addGnome(-40);
    addGnome(20);

    coinFlower(-10);
    coinFlower(30);

    // trees before dead-end
    coinTree(60);
    coinTree(90);
    coinTree(100);
    coinTree(110);

    // dead-end
    addEntity({ x: 144, width: 13, height: 22, things: misc }).color = '#006400';
    addEntity({ x: 145, width: 10, height: 20, things: misc }).color = '#333';
    coinFlower(133);

    // water
    addEntity({ x: 181, y: uWorldHeight, width: 60, height: 10, things: misc, className: 'water' }).color = '#2500FF';

    addEntity({ x: 158, y: uWorldHeight - 1, width: 15, height: 1, things: misc, className: 'wave1' });
    addEntity({ x: 172, y: uWorldHeight - 1, width: 15, height: 1, things: misc, className: 'wave1' });
    addEntity({ x: 217, y: uWorldHeight - 1, width: 15, height: 1, things: misc, className: 'wave1' });

    coinFlower(145, 29);

    // vagrant camp
    addCamp(-290);

    coinFlower(-110);

    coinTree(-140);

    evilCamp();

    // coins bar
    coinBar = addEntity({ x: 2, y: 2, width: 15, height: 2, className: 'bar' });
    coinBar.color = '#444';

    coinValue = addEntity({ x: 2, y: 2, width: 15, height: 2, className: 'bar' });
    coinValue.color = '#ffff00';
}

function villageFireAndBase() {
    thing = fire(11, 9, 8);

    thing.maxCoins = 1;
    thing.radius = 46 * unit;
    thing.intensity = 1;
    thing.burning = false;
    thing.mainFire = true;

    mainFire = thing;

    thing.levelUp = function () {
        this.level++;

        this.sated = false;
        this.burning = true;
        this.coins = 0;

        if (this.level === 1) {
            this.maxCoins = 3;

            fireLit = true;

            document.body.classList.remove('unlit');
        }

        if (this.level === 2) {
            this.maxCoins = 11;

            taskBerries();
        }

        if (this.level === 3) {
            this.maxCoins = 18;

            baseArtillary();
        }

        if (this.level === 4) {
            this.maxCoins = 0;

            addGnome(40, null, 80, 91.5).gnomezilla = true;
        }
    };
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

function baseArtillary() {
    thing = addEntity({ x: -30, y: uWorldHeight - 10, width: 3, height: 2 });

    thing.color = '#111';
    thing.attackWait = 50;

    thing.update = function () {
        this.attackWait -= delta * 0.1;

        if (!night) return;

        if (this.attackWait < 0) {
            thing = addProjectile(this.x / unit, this.y / unit, 1.5, 1.5);

            thing.vY = -1 * unit;
            thing.vX = -2.4 * unit / 12 - Math.random() * unit / 12;

            this.attackWait = 50;
        }
    };
}

function villageWalls() {
    [-50, -120].forEach(x => villageWall(x));
}

function taskBerries() {
    const redBerry = addRedBerry();
    const blueBerry = addBlueBerry();

    redBerry.levelUp = function () {
        blueBerry.coins = 0;
        blueBerry.sated = false;

        if (blueBerry.y > this.y) blueBerry.y = this.y;

        this.y = this.y + 3.8 * unit;
    };

    blueBerry.levelUp = function () {
        redBerry.coins = 0;
        redBerry.sated = false;

        if (redBerry.y > this.y) redBerry.y = this.y;

        buildersExist = true;

        this.y = this.y + 3.8 * unit;
    };
}

function addRedBerry() {
    thing = addEntity({ x: -20, y: uWorldHeight - 14, width: 5, height: 5 });

    thing.maxCoins = 1;

    thing.color = '#5C0000';

    berries.push(thing);

    return thing;
}

function addBlueBerry() {
    // blue berry
    thing = addEntity({ x: 40, y: uWorldHeight - 14, width: 5, height: 5 });

    thing.maxCoins = 1;

    thing.color = '#200E4F';

    berries.push(thing);

    return thing;
}
