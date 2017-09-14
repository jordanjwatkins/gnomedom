function villageWall(x) {
    thing = addEntity({ x: x, y: uWorldHeight - 13, width: 5, height: 13, things: walls, className: 'wall' });

    thing.maxCoins = 3;
    thing.destroyed = true;

    thing.sW = 5;
    thing.sH = 7;
    thing.health = 0;

    thing.levelUp = function () {
        builderTasks.push(this);
        this.targetable = true;
    };

    thing.build = function () {
        if (this.buildTime > 0) return --this.buildTime;

        this.buildTime = 500;

        if (this.level === 0) {
            this.level++;
            this.health = 30;
            this.maxCoins = 4;
            this.coins = 0;
            this.sated = false;
        } else if (this.level === 1 && this.health === 30) {
            this.width = 10 * unit;
            this.height = 18 * unit;
            this.health = 40;
        } else {
            this.health = 30;
            this.coins = 0;
            this.sated = false;
        }

        this.destroyed = false;

        return 'built';
    };
}
