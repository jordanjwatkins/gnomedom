const debug = false;

function initInput() {
    document.addEventListener('keydown', keydown);
    document.addEventListener('keyup', keyup);

    document.body.addEventListener('mousedown', mouseDown);
    document.body.addEventListener('mouseup', mouseUp);

    document.body.addEventListener('touchstart', mouseDown);
    document.body.addEventListener('touchend', mouseUp);

    // prevent right click unless debugging
    if (!debug) window.addEventListener('contextmenu', event => event.preventDefault());

    // hide key instructions after player moves
    document.addEventListener('keydown', hideControlsLegend);
    document.addEventListener('mousedown', hideControlsLegend);
    document.addEventListener('touchstart', hideControlsLegend);

    if (!debug) return;

    // click x in game units for debugging
    document.addEventListener('click', event => {
        console.log('click', (event.clientX - elWorld.x) / unit - 60);
    });
}

function hideControlsLegend(event) {
    const elKeys = document.querySelector('.keys');

    if (
        event.which === 37 ||
        event.which === 39 ||
        event.type === 'mousedown' ||
        event.type === 'touchstart'
    ) {
        setTimeout(() => {
            elKeys.classList.add('hide');
        }, 4000);

        setTimeout(() => {
            elKeys.classList.add('out');
        }, 5000);

        document.removeEventListener('keydown', hideControlsLegend);
        document.removeEventListener('mousedown', hideControlsLegend);
        document.removeEventListener('touchstart', hideControlsLegend);
    }
}

function mouseDown(event) {
    event.preventDefault();

    const pointer = (event.touches) ? event.touches[0] : event;
    const pointer2 = (event.touches) ? event.touches[1] : null;

    if (
        (
            pointer.clientX > event.view.innerWidth / 3 &&
            pointer.clientX < (event.view.innerWidth / 3) * 2
        ) ||
        (
            pointer2 &&
            pointer2.clientX > event.view.innerWidth / 3 &&
            pointer2.clientX < (event.view.innerWidth / 3) * 2
        )
    ) {
        keys.up = true;

        return;
    }

    if (pointer.clientX < event.view.outerWidth / 2 || (pointer2 && pointer2.clientX < event.view.outerWidth / 2)) {
        keys.left = true;
    } else {
        keys.right = true;
    }
}

function mouseUp(event) {
    event.preventDefault();

    const pointer = (event.changedTouches) ? event.changedTouches[0] : event;
    const pointer2 = (event.changedTouches) ? event.changedTouches[1] : null;

    if (keys.up) {
        keys.up = false;

        spendCoin(keys);

        return;
    }

    keys.left = false;
    keys.right = false;

    if (event.touches && event.touches.length > 0) {
        if (
            pointer.clientX < event.view.outerWidth / 2 ||
            (pointer2 && pointer2.clientX < event.view.outerWidth / 2)
        ) {
            keys.right = true;
        } else {
            keys.left = true;
        }
    }
}

function keydown(event) {
    if (event.which == 37) keys.left = true;
    if (event.which == 39) keys.right = true;
    if (event.which == 38) keys.up = true;
    if (event.which == 40 && debug) test();
}

function keyup(event) {
    if (event.which == 37) keys.left = false;
    if (event.which == 39) keys.right = false;
    if (event.which == 38) {
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

