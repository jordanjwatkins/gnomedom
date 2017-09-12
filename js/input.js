function keydown(e) {
    if (e.which == 37) keys.left = true;
    if (e.which == 39) keys.right = true;
    if (e.which == 38) keys.up = true;
    if (e.which == 40) test();
}

function keyup(e) {
    if (e.which == 37) keys.left = false;
    if (e.which == 39) keys.right = false;
    if (e.which == 38) {
        keys.up = false;

        spendCoin(keys);
    }
}

function test() {
    //walls[0].health = 10;
    //walls[0].destroyed = false;
    //walls[0].coins = 3;

    thing = addGnome(elHorse.x / unit + 14);
    thing.filter = 'evil';
    thing.moveType = 'walking';
    thing.speed = unit / 1.8;
    thing.leftHome = true;

    //addGnome(elHorse.x / unit + 4);
}

function keyMove() {
    // stop on right side
    if (elHorse.x > 125 * unit) {
        keys.right = false;
    } else if (elHorse.x < -320 * unit) {
        if (!evilWall.destroyed) keys.left = false;
    }

    if (keys.left) {
        horseMove(delta, 1);

        elHorse.classList.add('run');
        elHorse.classList.remove('right');
    } else if (keys.right) {
        horseMove(delta, -1);

        elHorse.classList.add('run', 'right');
    } else if (delta > 0) elHorse.classList.remove('run');

    if (keys.up) useCoins(keys);
}

