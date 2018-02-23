function handleEvil(gnome) {
    if ((gnome.coins >= gnome.maxCoins || !(hour > 13 || hour < 6) || gnome.headedHome) && gnome.leftHome) {
        walkToTarget(gnome, gnome.campX);

        if (gnome.x > gnome.campX - 1 * unit && gnome.x < gnome.campX + 4 * unit) {
            gnome.active = false;
            gnomePool.push(gnome);
        }

        if (gnome.coins < gnome.maxCoins) {
            tryForCloserTarget(gnome, elHorse);

            if (gnome.closeTarget && gnome.closeTarget.active && boxesCollide(gnome, gnome.closeTarget)) attackGnome(gnome, gnome.closeTarget);
        }

        return;
    }

    // return from end of world
    if (gnome.x > 139 * unit) {
        gnome.headedHome = true;

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
}

function maybeStartWallAttack(gnome, wall) {
    if (wall && !wall.destroyed && boxesCollide(gnome, wall) && !gnome.startingAttack) {
        gnome.targetWall = wall;

        gnome.vX = (gnome.vX > 0) ? -0.05 * unit : 0.05 * unit;
        gnome.startingAttack = true;

        random = 100 + 600 * Math.random();

        const g = gnome;

        setTimeout(function () {
            g.startingAttack = false;

            g.moveType = 'attack';

            g.vX = 0;
        }, random);
    }
}

function attackWall(gnome1, wall) {
    if (gnome1.attackWait <= 0 && !gnome1.dead) {
        gnome1.attackWait = 193;
        gnome1.attacking = true;
        wall.shaking = true;
        wall.health -= 1;

        // if not in the middle of paying for repairs
        if (wall.coins !== 3) {
            // make repairable
            wall.coins = 2;
            wall.sated = false;
        }

        const w = wall;
        const g1 = gnome1;

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
