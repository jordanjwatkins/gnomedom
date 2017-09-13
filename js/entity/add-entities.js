function addEntities() {
    // walls
    var thing;

    [-50, -120].forEach(x => {
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
    });

    // main fire
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
            fireLit = true;
            document.body.classList.remove('unlit');
            this.maxCoins = 3;
        }

        if (this.level === 2) {
            this.maxCoins = 11;

            // red berry
            thing = addEntity({ x: -20, y: uWorldHeight - 14, width: 5, height: 5 });

            thing.maxCoins = 1;

            const redBerry = thing;

            thing.color = '#5C0000';

            berries.push(thing);

            // blue berry
            thing = addEntity({ x: 40, y: uWorldHeight - 14, width: 5, height: 5 });

            thing.maxCoins = 1;

            const blueBerry = thing;

            thing.color = '#200E4F';

            berries.push(thing);

            blueBerry.levelUp = function () {
                redBerry.coins = 0;
                redBerry.sated = false;

                buildersExist = true;

                if (redBerry.y > this.y) redBerry.y = this.y;

                this.y = this.y + 3.8 * unit;
            };

            redBerry.levelUp = function () {
                blueBerry.coins = 0;
                blueBerry.sated = false;

                if (blueBerry.y > this.y) blueBerry.y = this.y;

                this.y = this.y + 3.8 * unit;
            };
        }

        if (this.level === 3) {
            this.maxCoins = 18;

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

        if (this.level === 4) {
            addGnome(40, null, 80, 91.5).gnomezilla = true;
            this.maxCoins = 0;
        }
    };

    // village
    addGnome(-40);
    addGnome(20);

    coinFlower(-10);
    coinFlower(30);

    coinFlower(-110);

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

    coinTree(-140);

    // evil wall
    thing = addEntity({ x: -620, width: 40, height: 40, className: 'evilWall' });
    thing.evil = true;
    thing.sW = 4;
    thing.sH = 4;

    evilWall = thing;

    // evil fire
    thing = fire(-569, 13, 17);
    thing.evil = true;

    coinFlower(-593);

    // spawn evils
    let evils = 0;

    thing.spawner = setInterval(spawn, 4000);

    const eF = thing;

    spawn();

    function spawn(x, extra) {
        x = x || -569;
        if (!(hour > 15 || hour < 6)) return evils = 0;
        if (evils > days - 1) return;
        if (!eF.burning) return;

        if (!extra) evils++;

        thing = addGnome(-569);
        thing.filter = 'evil';
        thing.moveType = 'walking';
        thing.speed = unit / 1.8;

        // avoid evil not appearing when horse is over fire during spawn
        let t = thing;

        t.leftHome = false;

        setTimeout(function () {
            t.leftHome = true;
            if (days > 8 && !extra) {
                spawn(null, true);
            }

            if (days > 10 && !extra) {
                spawn(null, true);
            }

            if (days > 12 && !extra) {
                spawn(null, true);
            }

            if (days > 14 && !extra) {
                spawn(null, true);
            }
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
