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

        if (this.level === 2) {
            // repair
            this.health = 50;
            this.coins = 4;
        }

        if (this.level === 1) {
            // full health
            if (this.health === 40) {
                // upgrade
                this.width = 10 * unit;
                this.height = 18 * unit;
                this.y -= 4 * unit;
                this.health = 50;
                this.level++;
                this.coins = 4;
            } else {
                // repair
                this.health = 40;
                this.coins = 0;
                this.sated = false;
            }
        }

        // unbuilt
        if (this.level === 0) {
            // build
            this.level++;
            this.health = 40;
            this.maxCoins = 4;
            this.coins = 0;
            this.sated = false;
        }

        this.destroyed = false;

        return 'built';
    };
}
