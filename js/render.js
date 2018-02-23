function maybeRender(thing) {
    if (thing.update) thing.update();
    if (thing.className.match('campfire')) return renderFire(thing);
    if (thing.className.match('coinflower')) return renderCoinFlower(thing);
    if (thing.className.match('bar')) return renderCoinBar(thing);
    if (thing.className.match('wave1')) return renderWave1(thing);
    if (thing.className.match('water')) return renderWater(thing);
    if (thing.className.match('evilWall')) return renderEvilWall(thing);

    if (thing.color) draw(thing, 0);
}

function renderDayNight() {
    darken(0, 0, elCanvas.clientWidth, elCanvas.clientHeight, '#000000', darkness);

    misc.forEach((thing) => {
        if (thing.className === 'campfire' && thing.burning) {
            cutoutGradient(thing.x + 50 * unit + elWorld.x, elCanvas.clientHeight - 13 * unit, thing.radius, thing.intensity);
        }
    });

    walls.forEach((thing) => {
        if (!thing.destroyed) {
            cutoutGradient(thing.x + 50 * unit + elWorld.x, elCanvas.clientHeight - 18 * unit, 23 * unit, 0.8);
        }
    });
}

function renderWall(wall) {
    if (wall.sprite) {
        const offset = (wall.shaking) ? -1 * unit : 0;

        (wall.destroyed) ? draw(wall, 0, offset) : draw(wall, 1, offset);
    } else {
        wall.sprite = images.wall;
    }
}

function renderEvilWall(wall) {
    if (wall.sprite) {
        const offset = 20 * unit;

        (wall.destroyed) ? draw(wall, 1, offset) : draw(wall, 0, offset);
    } else {
        wall.sprite = images.evilWall;
    }
}

function renderWave1(wall) {
    if (wall.sprite) {
        wall.sW = 25;
        wall.sH = 2;

        if (Math.sin(lastFrameTimeMs / 100) > 0) {
            wall.sY = 0;
            draw(wall, 0, 0, 0, darknessCtx);
        } else {
            wall.sY = 2;
            draw(wall, 0, 0, 0, darknessCtx);
        }

        draw(wall, 0, 0, 0, darknessCtx);
    } else {
        wall.sprite = images.wave1;
    }
}

function renderWater(thing) {
    draw(thing, 0, 0, 0, darknessCtx);
}

function renderCoinFlower(thing) {
    thing.sprite = images.coinflower;

    if (thing.tree) {
        thing.sprite = (thing.skin === 'cointree') ? images.cointree : images.cointree2;

        return draw(thing, 0);
    }

    if (boxesCollide(elHorse, thing)) {
        if (thing.canBePickedUp) {
            draw(thing, 1);

            thing.canBePickedUp = false;

            elHorse.coins++;
        } else {
            draw(thing, 0);
        }
    } else {
        (thing.canBePickedUp) ? draw(thing, 1) : draw(thing, 0);

        if (thing.bloomHour > hour && thing.bloomHour < hour + 0.01) thing.canBePickedUp = true;
    }
}

function renderCoinBar() {
    drawRect(coinBar, coinBar.x, darknessCtx);

    coinValue.width = (elHorse.coins > 0) ? elHorse.coins * unit / 3 : 0;

    drawRect(coinValue, coinValue.x, darknessCtx);
}

function renderFire(fire) {
    if (fire.levelUp) {
        const baseLevel = (fire.level) ? fire.level - 1 : 0;

        draw({ x: 11 * unit, y: worldHeight - 70 * unit, width: 90 * unit, height: 70 * unit, sprite: images.base, sW: 9, sH: 7 }, baseLevel);
    }
    if (fire.sprite) {
        const timeValue = Math.tan(lastFrameTimeMs / 190);

        if (fire.burning) {
            if (timeValue < -0.66) {
                draw(fire, 1);
            } else if (timeValue > -0.66 && timeValue < 0.66) {
                draw(fire, 2);
            } else {
                draw(fire, 3);
            }
        } else {
            (fire.evil) ? draw(fire, 3) : draw(fire, 0);
        }
    } else {
        fire.sprite = (fire.evil) ?  images.evilCampfire : images.campfire;
    }
}

function renderGnome(gnome) {
    if (gnome.sprite) {
        if (gnome.dead) {
            draw(gnome, 0, null, 5 * unit);
            gnome.active = false;

            return;
        }

        gnome.sprite = (gnome.filter === 'poor') ? images.poor : images.green;

        if (gnome.filter === 'evil') gnome.sprite = (gnome.coins >= gnome.maxCoins) ? images.evilRich : images.evil;

        if (gnome.filter === 'blue') gnome.sprite = images.blue;
        if (gnome.filter === 'default') gnome.sprite = images.gnomeWalk;

        if (gnome.moveType === 'walking') {
            if (Math.sin(lastFrameTimeMs / 100) > 0) {
                draw(gnome, 0);
            } else {
                draw(gnome, 1);
            }
        } else {
            if (gnome.filter === 'evil' && gnome.attacking) return draw(gnome, 0, 2 * unit * gnome.attackDirection);

            draw(gnome, 0);
        }
    } else {
        gnome.sprite = images.poor;
    }
}
