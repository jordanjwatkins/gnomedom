function initInput() {
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    // hide key instructions after player moves
    document.addEventListener('keydown', event => {
        let elKeys = document.querySelector('.keys');

        if (event.which === 37 || event.which === 39) {
            setTimeout(() => {
                elKeys.classList.add('hide');
            }, 4000);

            setTimeout(() => {
                elKeys.classList.add('out');
            }, 5000);
        }
    });

    // click x in game units for debugging
    document.addEventListener('click', event => {
        //console.log('click', (event.clientX - elWorld.x) / unit - 60);
    });
}

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
    thing = addGnome(elHorse.x / unit + 14);
    thing.filter = 'evil';
    thing.moveType = 'walking';
    thing.speed = unit / 1.8;
    thing.leftHome = true;
}

function keyMove() {
    if (keys.up) useCoins(keys);

    // stop at right side dead-end
    if (elHorse.x > 127 * unit) {
        keys.right = false;
    }

    // stop at evil wall on the left side
    if (elHorse.x < -620 * unit) {
        if (!evilWall.destroyed) keys.left = false;
    }

    // move left/right or stop
    if (keys.left) {
        horseMove(delta, 1);

        elHorse.classList.add('run');
        elHorse.classList.remove('right');
    } else if (keys.right) {
        horseMove(delta, -1);

        elHorse.classList.add('run', 'right');
    } else if (delta > 0) elHorse.classList.remove('run');
}

