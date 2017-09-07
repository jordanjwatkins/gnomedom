var gnomes = [];
var gnomePool = [];
var gFilters = {
    poor: 'grayscale(100%) brightness(65%)',
    evil: 'hue-rotate(120deg) brightness(5%) drop-shadow(0 0 15px black)',
};

let gnome;

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

    gnome.sprite = images.gnomeWalk;

    gnome.sW = 7;
    gnome.sH = 11;

    gnome.vX = 0;
    gnome.vY = 0;
    gnome.wait = 5;
    gnome.headedHome = false;
    gnome.attackWait = 100;

    gnome.moveType = 'standing';
    //gnome.moveType = 'falling';
    gnome.filter = 'poor';

    gnome.maxCoins = 1;

    gnome.style.filter = gFilters[gnome.filter];

    gnome.villagePos = -60 * unit + 40 * unit * Math.random();
    gnome.campX = gnome.x;

    gnome.speed = unit / 5;

    gnome.style.filter = 'hue-rotate(120deg) brightness(45%)'; // zombie gnome

    gnome.defaultFilter = 'hue-rotate(' + Math.random() * 1000 + 'deg)'; // rainbow gnomes

    return gnome;
}

function moveGnome(gnome) {
    if (!gnome.active) return;

    gnome.y = worldHeight  - gnome.height;

    if (gnome.moveType === 'walking') {
        if (gnome.vX === 0)  {
            //gnome.vX = randomDirection() * unit / 12;
        }

        gnome.x += gnome.vX;
    }

    renderGnome(gnome);
}

function maybeStartWallAttack(gnome, wall) {
    if (wall && !wall.destroyed && boxesCollide(gnome, wall) && !gnome.startingAttack) {
        console.log('hit wall');

        gnome.targetWall = wall;

        gnome.attackDirection = (gnome.vX > 0) ? 1 : -1;

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

function attackWall(gnome, wall) {
    if (gnome.attackWait === 0) {
        console.log('attack');

        gnome.attackWait = 63;
        gnome.attacking = true;
        wall.shaking = true;
        wall.health -= 1;

        setTimeout(function () {
            wall.shaking = false;
            gnome.attacking = false;
        }, 30);

        if (wall.health <= 0) {
            wall.destroyed = true;
            wall.sated = false;
            wall.coins = 0;

            gnome.moveType = 'walking';

            gnome.vX = gnome.attackDirection * gnome.speed;
        }
    }

    gnome.attackWait -= 1;
}

function attackGnome(gnome, target) {
    console.log('try attack gnome');
    if (target.filter === 'default' && target.coins > 0 && (gnome.attackWait < 50 || gnome.attackWait > 99)) {
        console.log('attack gnome');

        gnome.attackWait = 63;
        gnome.attacking = true;

        target.coins--;
        gnome.coins++;
        target.filter = 'poor';

        gnome.vX = 0;
        //gnome.startingAttack = true;

        setTimeout(function () {
            //target.shaking = false;
            //gnome.attacking = false;
        }, 830);

        setTimeout(function () {
            //gnome.vX = -gnome.attackDirection * gnome.speed;
        }, 1930);
    }

    gnome.attackWait -= 1;
}

function handlePoor(gnome) {
    if (gnome.coins > 0) {
        gnome.filter = 'default';
        headHome(gnome);

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

    (gnome.filter === 'poor') ? walkToTarget(gnome, gnome.campX) : walkToTarget(gnome, gnome.villagePos);
}

function walkToTarget(thing, target) {
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
    if (gnome.filter === 'evil') {
        if (gnome.coins >= gnome.maxCoins) {
            walkToTarget(gnome, gnome.campX)
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

            //if (gnome.closeTarget && gnome.closeTarget.active) console.log('collide', boxesCollide(gnome, gnome.closeTarget));

            if (gnome.closeTarget && gnome.closeTarget.active && boxesCollide(gnome, gnome.closeTarget)) attackGnome(gnome, gnome.closeTarget);
        }

        if ((gnome.moveType === 'attack' || gnome.startingAttack) && gnome.coins !== gnome.maxCoins) {
            if (gnome.targetWall) {
                if (gnome.targetWall.destroyed) gnome.targetWall = null;

                if (gnome.targetWall) {
                    attackWall(gnome, gnome.targetWall);
                } else {
                    (gnome.coins === gnome.maxCoins) ? walkToTarget(gnome, gnome.campX) : walkToTarget(gnome, gnome.villagePos);
                }
            }
        } else if (gnome.coins !== gnome.maxCoins) {
            (gnome.campX - gnome.villagePos) ? walkToTarget(gnome, 1000)  : walkToTarget(gnome, -1000);
        } else {
            (gnome.campX - gnome.villagePos) ? walkToTarget(gnome, -1000)  : walkToTarget(gnome, 1000);
        }

        moveGnome(gnome);

        return;
    }

    if (gnome.filter === 'poor') {
        //console.log('update poor gnome');
        handlePoor(gnome);
        moveGnome(gnome);

        return;
    }

    // move toward village
    if (gnome.moveType === 'standing') {
        if (!gnome.task) {
            walkToTarget(gnome, gnome.villagePos);
        }
    }

    // stop at village
    if (gnome.moveType === 'walking') {
        if (gnome.x > gnome.villagePos && gnome.x < gnome.villagePos + 12 * unit) {
            gnome.moveType = 'standing';
            gnome.task = 'idle';
        }
    }

    gnome.attackWait -= delta * 0.1;

    if (gnome.attackWait < 0) {
        addProjectile(gnome.x / unit, gnome.y / unit, 1, 1);
        gnome.attackWait = 200;
    }

    moveGnome(gnome);
}
