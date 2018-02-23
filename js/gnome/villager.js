function handleVillager(gnome) {
    // target sense radius
    closeTargetDistance = 15550 * unit;

    if (gnome.filter === 'green') {
        gnome.closeTarget = null;
        gnome.moveType = 'standing';

        berries.forEach((berry, index) => {
            if (berry.coins > 0 && boxesCollide(gnome, berry)) {
                berry.sated = false;
                berry.coins = 0;
                berry.y = berry.y - 4 * unit;

                gnome.filter = (index) ? 'blue' : 'default';

                return;
            } else if (berry.coins > 0) {
                tryForCloserTarget(gnome, berry);
            }
        });

        chooseWalkTarget(gnome);

        gnome.closeTarget = null;

        return;
    }

    // stop at village
    if (gnome.moveType === 'walking' && gnome.task !== 'defend') {
        if (atTarget(gnome, gnome.villagePos)) {
            gnome.moveType = 'standing';
            gnome.task = 'idle';
        }
    }

    if (gnome.filter === 'default') {
        if (night) {
             // fire projectiles
            gnome.attackWait -= delta * 0.1;

            if (gnome.attackWait < 0) {
                addProjectile(gnome.x / unit, gnome.y / unit, 1, 1);
                gnome.attackWait = 200;
            }

            if (gnome.task === 'idle') {
                gnome.closeTarget = walls[0].x + 4 * unit + 6 * unit * Math.random();

                walkToTarget(gnome, gnome.closeTarget);

                gnome.task = 'defend';
            }

            if (atTarget(gnome, gnome.closeTarget)) {
                gnome.moveType = 'standing';
            }
        } else {
            gnome.task = 'idle';
            chooseWalkTarget(gnome);
        }
    } else if (gnome.filter === 'blue') {
        if (!gnome.building) {
            gnome.closeTarget = null;

            builderTasks.forEach((target) => {
                tryForCloserTarget(gnome, target);
            });
        }

        if (gnome.closeTarget) {
            if(boxesCollide(gnome, gnome.closeTarget)) {
                if (gnome.closeTarget.build(gnome) === 'built') {
                    gnome.moveType = 'standing';
                    gnome.building = false;
                    gnome.closeTarget.builder = null;
                    gnome.building = false;
                    gnome.closeTarget.targetable = false;
                    gnome.closeTarget = null;
                } else {
                    (Math.sin(lastFrameTimeMs / 80) > 0) ? walkToTarget(gnome, gnome.closeTarget.x + 13 * unit) : walkToTarget(gnome, gnome.closeTarget.x - 13 * unit);
                }
            } else {
                //gnome.building = false;
                walkToTarget(gnome, gnome.closeTarget.x);
            }
        } else {
            walkToTarget(gnome, gnome.villagePos);

            if (atTarget(gnome, gnome.villagePos)) {
                gnome.moveType = 'standing';
                gnome.task = 'idle';
                gnome.moveType = 'standing';
                gnome.building = false;
            }
        }
    }
}
