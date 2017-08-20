var elHorse, elWorld, elGirl, currentWidth, unit, horseDirection, speed, wX;

var resizeDelta = 0;

var world = { x: 25 * window.innerWidth / 100 };

var keys = {
    left: false,
    right: false
}

document.addEventListener('DOMContentLoaded', function () {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');

    document.addEventListener('keydown', function (e) {
        if (e.which == 37) keys.left = true;
        if (e.which == 39) keys.right = true;
        if (e.which == 38) useCoin();
    });

    document.addEventListener('keyup', function (e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
    });

    elWorld.x = 25 * window.innerWidth / 100;

    elHorse.width = 12.5 * unit;

    setWorldSize();

    horseMove(0, 1);

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    document.body.classList = 'loaded';

    update();
});

window.addEventListener('resize', function () {
    resizeDelta = currentWidth / window.innerWidth;

    setWorldSize();
    
    horseMove(0, horseDirection);

    coins.forEach(resizeCoin);
});


function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;

    elWorld.x = (resizeDelta) ? elWorld.x / resizeDelta : elWorld.x;

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = (resizeDelta) ?  elHorse.width / resizeDelta : elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;
}

function horseMove(delta, direction) {
    speed = unit / 25;

    elWorld.x += direction * speed * delta;

    wX = Math.round(elWorld.x);
    
    elHorse.x = -wX - elHorse.width / 2;
    elGirl.x = -wX - elHorse.width / 4.9;

    horseDirection = direction;

    roundedMove(elWorld);
    roundedMove(elHorse);
    roundedMove(elGirl);
}

function keyMove() {
    if (keys.left) {
        horseMove(delta, 1);

        elHorse.classList.add('run');
        elGirl.classList.add('run');

        elHorse.classList.remove('right');
        elGirl.classList.remove('right');
    } else if (keys.right) {
        horseMove(delta, -1);

        elHorse.classList.add('run', 'right');
        elGirl.classList.add('run','right');
    } else {
        // don't remove first tick so 'run' image preloads correctly
        if (delta > 0) elHorse.classList.remove('run');

        elGirl.classList.remove('run');
    }
}

var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    keyMove();

    coins.forEach(moveCoin);

    coins.forEach(maybePickUpCoin);

    gnomes.forEach(moveCoin);

    requestAnimationFrame(update);
}