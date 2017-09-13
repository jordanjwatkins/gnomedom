function addCamp(x) {
    const camp = {
        pop: 2,
    };

    // fire
    fire(x, 7, 5);

    // gnomes
    addGnome(x - 10).camp = camp;
    addGnome(x + 10).camp = camp;

    setInterval(function () {
        if (night && camp.pop < 2) {
            addGnome(x - 10 + 40 * Math.random()).camp = camp;
            camp.pop++;
        }
    }, 30000);

    [
        x + 25, x - 25, x + 38,
        x - 35, x + 45, x - 49,
        x + 55, x - 95, x + 97,
        x + 110, x - 120, x - 130,
        x - 150, x - 170, x - 200,
        x - 220, x - 460, x - 380,
        x - 420,
    ].forEach(bush);

    coinFlower(x - 80);
    coinFlower(x - 150);
}

function bush(x) {
    thing = addEntity({ x: x, width: Math.random() * 40 + 2, height: Math.random() * 37 + 2, things: bg, className: 'bush' });

    thing.color = (Math.random() > 0.5) ? '#006400' : '#173300';
}

function coinFlower(x, y) {
    y = y || 7;

    thing = addEntity({ x: x, y: uWorldHeight - y, width: 3, height: 7, things: misc, className: 'coinflower' });

    thing.sprite = images.coinflower;

    thing.sH = 7;
    thing.sW = 3;

    thing.canBePickedUp = true;
    thing.bloomHour = Math.random() * 24;

    thing.maxCoins = 1;

    thing.levelUp = function () {
        builderTasks.push(this);
        this.resets = 1;
        this.targetable = true;
    };

    thing.build = function (gnome) {
        this.builder = gnome;
        gnome.building = true;
        this.targetable = false;

        if (this.buildTime > 0) return --this.buildTime;

        addCoin(this.x / unit, this.y / unit - 4, 2, 3);

        this.buildTime = 800;

        if (this.resets > 0) {
            this.resets--;

            return;
        }

        this.builder = null;
        this.coins = 0;
        gnome.building = false;
        this.sated = false;

        return 'built';
    };
}

function coinTree(x, y) {
    y = y || 7;

    thing = addEntity({ x: x, width: 10 + 20 * Math.random(), height: 10 + 30 * Math.random(), things: bg, className: 'coinflower' });

    thing.skin = (Math.random() > 0.5) ? 'cointree' : 'cointree2';

    thing.sH = 3.5 + 0.5 * Math.random();
    thing.sW = 3;

    thing.tree = true;
}
