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
    gnome.attackWait = 193;

    gnome.moveType = 'standing';
    gnome.filter = 'poor';
    gnome.task = 'idle';

    gnome.maxCoins = 1;

    gnome.villagePos = -20 * unit + 60 * unit * Math.random();
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

function chooseWalkTarget(gnome) {
    if (gnome.closeTarget && gnome.closeTarget.active) {
        walkToTarget(gnome, gnome.closeTarget.x);

        gnome.headedHome = false;
    } else if (atTarget(gnome, gnome.home)) {
        if (gnome.headedHome) {
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

    walkToTarget(gnome, gnome.home);
}

function walkToTarget(thing, target) {
    thing.attackDirection = (thing.x - target > 0) ? -1 : 1;
    thing.vX = (thing.x - target > 0) ? -thing.speed : thing.speed;

    thing.moveType = 'walking';
}

function tryForCloserTarget(thing, target) {
    if (!target || !target.active || !target.targetable) return;

    distanceToTarget = Math.abs((target.x - thing.x));

    if (distanceToTarget < closeTargetDistance) {
        closeTargetDistance = distanceToTarget;
        thing.closeTarget = target;
    }
}

function updateGnome(gnome) {
    if (!gnome.active) return;

    gnome.home = (gnome.filter === 'poor' || gnome.filter === 'evil') ? gnome.campX : gnome.villagePos;

    if (gnome.filter === 'evil') {
        handleEvil(gnome);
    } else if (gnome.gnomezilla) {
        gnome.filter = 'default';
        gnome.vX = -gnome.speed;
        gnome.moveType = 'walking';

        gnomes.forEach(target => {
            if (target.filter === 'evil' && boxesCollide(gnome, target)) target.dead = true;
        });

        misc.forEach(target => {
            if (target.burning && target.evil && boxesCollide(gnome, target)) target.burning = false;
            if (target.evil && boxesCollide(gnome, target)) target.destroyed = true;
        });
    } else if (gnome.filter === 'poor') {
        handlePoor(gnome);
    } else {
        handleVillager(gnome);
    }

    moveGnome(gnome);
}

function atTarget(gnome, target) {
    return (gnome.x > target - 1.5 * unit && gnome.x < target + 1.5 * unit);
}
