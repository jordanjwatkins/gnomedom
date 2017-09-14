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
