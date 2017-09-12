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
            addGnome(x - 10 + 20 * Math.random());
            camp.pop++;
        }
    }, 30000);

    addEntity({ x: x + 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x + 38, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 35, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x + 45, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 49, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    addEntity({ x: x + 55, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 95, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    coinFlower(x + 41);
    coinFlower(x + 61);
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
        this.resets = 3;
        this.targetable = true;
    };

    thing.build = function (gnome) {
        this.builder = gnome;
        gnome.building = true;
        this.targetable = false;

        if (this.buildTime > 0) return --this.buildTime;

        console.log('addCoin');
        addCoin(this.x / unit, this.y / unit - 4, 2, 3);

        this.buildTime = 800;

        if (this.resets > 0) {
            //this.canBePickedUp = true;
            this.resets--;

            return;
        }

        this.builder = null;
        this.coins = 0;
        gnome.building = false;
        //this.targetable = true;

        return 'built';
    };
}

function coinTree(x, y) {
    y = y || 7;

    thing = addEntity({ x: x, y: uWorldHeight - 39, width: 13, height: 47, things: misc, className: 'coinflower' });

    thing.sprite = images.coinflower;

    thing.sH = 4;
    thing.sW = 3;

    //thing.canBePickedUp = true;
    thing.tree = true;
}
