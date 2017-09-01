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

    gnome.vX = 0;
    gnome.vY = 0;
    gnome.wait = 5;
    gnome.headedHome = false;

    gnome.moveType = 'standing';
    //gnome.moveType = 'falling';
    gnome.filter = 'poor';

    gnome.maxCoins = 1;

    gnome.style.filter = gFilters[gnome.filter];

    gnome.villagePos = -60 * unit + 40 * unit * Math.random();
    gnome.campX = gnome.x;

    gnome.speed = unit / 5;

    // gnome.style.filter = 'hue-rotate(120deg) brightness(45%)'; // zombie gnome

    gnome.defaultFilter = 'hue-rotate(' + Math.random() * 1000 + 'deg)'; // rainbow gnomes

    return gnome;
}

function moveGnome(gnome) {
    if (!gnome.active) return;

    gnome.y = elWorld.clientHeight  - gnome.clientHeight;

    if (gnome.moveType === 'walking') {
        if (gnome.vX === 0)  {
            gnome.vX = randomDirection() * unit / 12;
            gnome.classList.add('walk');
        }

        if (gnome.vX > 0) gnome.classList.add('right');
        if (gnome.vX < 0)gnome.classList.remove('right');

        gnome.x += gnome.vX;
    }

    move(gnome);
}

function maybeStartWallAttack(gnome, wall) {
    if (wall && !wall.destroyed && boxesCollide(gnome, wall) && !gnome.startingAttack) {
        console.log('hit wall');

        gnome.targetWall = wall;

        gnome.attackDirection = (gnome.vX > 0) ? 1 : -1;

        gnome.vX = (gnome.vX > 0) ? -0.05 * unit : 0.05 * unit;
        gnome.startingAttack = true;

        random = 300 + 1200 * Math.random();

        setTimeout(function () {
            gnome.startingAttack = false;

            gnome.moveType = 'attack';
            gnome.classList.add('attack');

            (gnome.attackDirection === 1) ? gnome.classList.add('right') : gnome.classList.remove('right');

            gnome.vX = 0.001;

            gnome.attackTimer = Math.round(90 - (unit / 100) + random / 50);
        }, random);
    }
}

function attackWall(gnome, wall) {
    if (gnome.attackTimer === 0) {
        console.log('attack');

        wall.classList.add('shake');
        gnome.attackTimer = 63;
        wall.shaking = true;
        wall.health -= 1;

        setTimeout(function () {
            wall.classList.remove('shake');
            wall.shaking = false;
        }, 200);
    } else {
        gnome.attackTimer -= 1;
    }

    if (wall.health <= 0) {
        console.log('walking');

        wall.destroyed = true;
        wall.classList.add('destroyed');

        gnome.moveType = 'walking';
        gnome.classList.remove('attack');
        gnome.vX = 0;
    }
}

function handlePoor(gnome) {
    if (gnome.coins > 0) {
        // convert to citizen
        gnome.filter = 'default';
        gnome.style.filter = gnome.defaultFilter;

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
        if (!coin.active) return;

        tryForCloserTarget(gnome, coin);
    });

    if (gnome.moveType === 'standing') {
        chooseWalkTarget(gnome);

        return;
    }

    if (gnome.moveType === 'walking') {
        chooseWalkTarget(gnome);

        return;
    }
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
            gnome.classList.remove('walk');
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
    thing.classList.add('walk');
}

function tryForCloserTarget(thing, target) {
    distanceToTarget = Math.abs((target.x - thing.x));

    if (distanceToTarget < closeTargetDistance) {
        closeTargetDistance = distanceToTarget;
        thing.closeTarget = target;
    }
}

function updateGnome(gnome) {
    if (gnome.filter === 'evil') {
        if (!gnome.startingAttack) {
            walls.forEach((wall) => {
                maybeStartWallAttack(gnome, wall);
            });
        }

        if ((gnome.moveType === 'attack' || gnome.startingAttack) && gnome.coins !== gnome.maxCoins) {
            if (gnome.targetWall) {
                //if (gnome.targetWall.destroyed) gnome.targetWall = null;
                if (gnome.targetWall) {
                    attackWall(gnome, gnome.targetWall);
                } else {
                        (gnome.coins === gnome.maxCoins) ? walkToTarget(gnome, gnome.campX) : walkToTarget(gnome, gnome.villagePos);
                }
            }
        } else {
            gnome.classList.remove('attack');
            (gnome.coins === gnome.maxCoins) ? walkToTarget(gnome, gnome.campX) : walkToTarget(gnome, gnome.villagePos);

            if (gnome.x > gnome.villagePos && gnome.x < gnome.villagePos + 12 * unit) {
                gnome.moveType = 'standing';
                gnome.classList.remove('walk');
                gnome.task = 'idle';
            }
        }

        moveGnome(gnome);

        return;
    }

    if (gnome.filter === 'poor') {
        handlePoor(gnome);
        moveGnome(gnome);

        return;
    }

    if (gnome.moveType === 'falling') {
        return (gnome.vY !== 0) ? moveCoin(gnome) : gnome.moveType = 'walking';
    }

    // move toward village
    if (gnome.moveType === 'standing') {
        if (gnome.filter !== 'poor' && !gnome.task) {
            walkToTarget(gnome, gnome.villagePos);

            gnome.classList.remove('attack');

        }
    }

    // stop at village
    if (gnome.moveType === 'walking' && gnome.filter !== 'poor') {
        if (gnome.x > gnome.villagePos && gnome.x < gnome.villagePos + 12 * unit) {
            gnome.moveType = 'standing';
            gnome.classList.remove('walk');
            gnome.task = 'idle';
        }
    }

    moveGnome(gnome);
}
