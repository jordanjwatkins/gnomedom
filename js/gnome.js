function addGnome(x, y, width, height) {
    width = width || 4;
    height = height || 6.3;

    y = y || uWorldHeight - height;

    gnome = addEntity({
        x, y, width, height,
        thingPool: gnomePool,
        things: gnomes,
        className: 'gnome',
    });

    gnome.sprite = images.poor;

    gnome.sW = 7;
    gnome.sH = 11;

    gnome.vX = 0;
    gnome.vY = 0;
    gnome.wait = 5;
    gnome.headedHome = false;
    gnome.attackWait = 100;

    gnome.moveType = 'standing';
    gnome.filter = 'poor';

    gnome.maxCoins = 1;

    gnome.villagePos = -60 * unit + 40 * unit * Math.random();
    gnome.campX = gnome.x;

    gnome.speed = unit / 5;

    gnome.health = 2;

    gnome.dead = false;

    return gnome;
}

function moveGnome(gnome) {
    if (!gnome.active) return;

    gnome.y = worldHeight  - gnome.height;

    if (gnome.moveType === 'walking') gnome.x += gnome.vX;

    renderGnome(gnome);
}

function maybeStartWallAttack(gnome, wall) {
    if (wall && !wall.destroyed && boxesCollide(gnome, wall) && !gnome.startingAttack) {
        console.log('hit wall');

        gnome.targetWall = wall;

        gnome.vX = (gnome.vX > 0) ? -0.05 * unit : 0.05 * unit;
        gnome.startingAttack = true;

        random = 100 + 600 * Math.random();

        setTimeout(function () {
            gnome.startingAttack = false;

            gnome.moveType = 'attack';

            gnome.vX = 0;
        }, random);
    }
}

function attackWall(gnome1, wall) {
    if (gnome1.attackWait <= 0 && !gnome1.dead) {
        console.log('attack');

        gnome1.attackWait = 63;
        gnome1.attacking = true;
        wall.shaking = true;
        wall.health -= 1;

        let w = wall;
        let g1 = gnome1;

        setTimeout(function () {
            w.shaking = false;
            g1.attacking = false;
        }, 30);

        if (wall.health <= 0) {
            wall.destroyed = true;
            wall.sated = false;
            wall.coins = 0;

            gnome1.moveType = 'walking';
        }
    }

    gnome1.attackWait -= 1;
}

function attackGnome(gnome, target) {
    if (((target.filter !== 'evil' && target.coins > 0) || target === elHorse)  && (gnome.attackWait < 50 || gnome.attackWait > 99)) {
        console.log('attack gnome');

        gnome.attackWait = 63;
        gnome.attacking = true;

        target.coins--;
        gnome.coins++;
        target.filter = 'poor';

        gnome.vX = 0;
        gnome.moveType = 'standing';

        setTimeout(function () {
            gnome.attacking = false;
        }, 50);
    }

    gnome.attackWait -= 1;
}

function handlePoor(gnome) {
    if (gnome.coins > 0) {
        gnome.filter = 'green';
        headHome(gnome);
        if (gnome.camp && gnome.camp.pop) gnome.camp.pop--;

        return;
    }

    if (gnome.wait > 0) {
        gnome.wait--;

        return;
    } else {
        gnome.wait = 20;
    }

    // coin sense radius
    closeTargetDistance = 50 * unit;

    if (!gnome.closeTarget || !gnome.closeTarget.active) gnome.closeTarget = null;

    coins.forEach(function (coin) {
        tryForCloserTarget(gnome, coin);
    });

    chooseWalkTarget(gnome);
}

function chooseWalkTarget(gnome) {
    if (gnome.closeTarget && gnome.closeTarget.active) {
        walkToTarget(gnome, gnome.closeTarget.x);

        gnome.headedHome = false;
    } else if (Math.abs(gnome.x - gnome.campX) < 10) {
        if (gnome.headedHome) {
            console.log('already at home');

            gnome.vX = 0;
            gnome.moveType = 'standing';
            gnome.headedHome = false;
        }
    } else {
        headHome(gnome);
    }
}

function headHome(gnome) {
    gnome.headedHome = true;

    (gnome.filter === 'poor' || gnome.filter === 'evil') ? walkToTarget(gnome, gnome.campX) : walkToTarget(gnome, gnome.villagePos);
}

function walkToTarget(thing, target) {
    thing.attackDirection = (thing.x - target > 0) ? -1 : 1;
    thing.vX = (thing.x - target > 0) ? -thing.speed : thing.speed;

    thing.moveType = 'walking';
}

function tryForCloserTarget(thing, target) {
    if (!target) return;

    distanceToTarget = Math.abs((target.x - thing.x));

    if (distanceToTarget < closeTargetDistance) {
        closeTargetDistance = distanceToTarget;
        thing.closeTarget = target;
    }
}

function updateGnome(gnome) {
    if (!gnome.active) return;

    if (gnome.filter === 'evil') {
        if (gnome.coins >= gnome.maxCoins || !night) {
            setTimeout(()=>{
                walkToTarget(gnome, gnome.campX);
            }, 350);

            if (gnome.x > gnome.campX + 1 * unit && gnome.x < gnome.campX + 2 * unit) {
               // console.log('gnome out');
                gnome.active = false;
                gnomePool.push(gnome);
            }

            moveGnome(gnome);

            return;
        }

        if (!gnome.startingAttack) {
            walls.forEach((wall) => {
                maybeStartWallAttack(gnome, wall);
            });
        }

        if (!gnome.startingAttack) {
            // coin sense radius
            closeTargetDistance = 50 * unit;

            if (!gnome.closeTarget || !gnome.closeTarget.active) gnome.closeTarget = null;

            gnomes.forEach((targetGnome) => {
                if (gnome !== targetGnome) tryForCloserTarget(gnome, targetGnome);
            });

            tryForCloserTarget(gnome, elHorse);

            if (gnome.closeTarget && gnome.closeTarget.active && boxesCollide(gnome, gnome.closeTarget)) attackGnome(gnome, gnome.closeTarget);
        }

        if ((gnome.moveType === 'attack' || gnome.startingAttack) && gnome.coins !== gnome.maxCoins) {
            if (gnome.targetWall && gnome.targetWall.destroyed) gnome.targetWall = null;

            if (gnome.targetWall) {
                attackWall(gnome, gnome.targetWall);
            } else if (gnome.coins !== gnome.maxCoins) {
                // continue attack
                (gnome.campX - gnome.villagePos) ? walkToTarget(gnome, 100000) : walkToTarget(gnome, -100000);
            }
        } else if (gnome.coins !== gnome.maxCoins) {
            (gnome.campX - gnome.villagePos) ? walkToTarget(gnome, 100000) : walkToTarget(gnome, -100000);
        }
    } else if (gnome.filter === 'poor') {
        //console.log('update poor gnome');
        handlePoor(gnome);
    } else {
        if (gnome.filter === 'green') {
            berries.forEach((berry, index) => {
                if (berry.coins > 0 && boxesCollide(gnome, berry)) {

                    berry.sated = false;
                    berry.coins = 0;
                    berry.y = berry.y - 4 * unit;

                    gnome.filter = (index) ? 'blue' : 'default';
                } else if (berry.coins > 0) {
                    tryForCloserTarget(gnome, berry);
                }
            });

            if (gnome.closeTarget && gnome.closeTarget.active) {
                chooseWalkTarget(gnome);

                moveGnome(gnome);

                gnome.closeTarget = null;

                return;
            }
        }

        // move toward village
        if (gnome.moveType === 'standing') {
            if (!gnome.task) {
                walkToTarget(gnome, gnome.villagePos);
            }
        }

        // stop at village
        if (gnome.moveType === 'walking' && gnome.task !== 'defend') {
            if (atTarget(gnome, gnome.villagePos)) {
                gnome.moveType = 'standing';
                gnome.task = 'idle';
            }
        }

        if (night) {
             // fire projectiles
            gnome.attackWait -= delta * 0.1;

            if (gnome.attackWait < 0) {
                addProjectile(gnome.x / unit, gnome.y / unit, 1, 1);
                gnome.attackWait = 200;
            }

            // guard wall
            if (gnome.task === 'idle' && gnome.filter === 'default') {
                gnome.closeTarget = walls[0].x + 3 * unit + 10 * unit * Math.random();
                walkToTarget(gnome, gnome.closeTarget);
                gnome.task = 'defend';
            }

            if (atTarget(gnome, gnome.closeTarget)) {
                gnome.moveType = 'standing';
            }
        }
    }

    moveGnome(gnome);
}

function atTarget(gnome, target) {
    return (gnome.x > target - 1.5 * unit && gnome.x < target + 1.5 * unit);
}
