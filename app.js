var elHorse, elWorld;

var world = { x: -1500 };

var keys = {
    left: false,
    right: false
}

document.addEventListener('DOMContentLoaded', function () {
    elHorse = document.querySelector('.horse');
    elWorld = document.querySelector('.world');

    elHorse.x = -world.x;
    elHorse.y = elHorse.offsetTop;

    document.addEventListener('keydown', function (e) {
        if (e.which == 37) keys.left = true;
        if (e.which == 39) keys.right = true;
        if (e.which == 38) useCoin();
    });

    document.addEventListener('keyup', function (e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
    });

    update();
});

function horseLeft(delta) {
    var speed = window.innerWidth / 1000;

    world.x += speed * delta;

    var wX = Math.round(world.x);
    elHorse.x = -wX;

    elHorse.style.transform = 'translateX(-50%) scaleX(1)';
    elHorse.style.left = elHorse.x + 'px';
    
    elWorld.style.transform = 'translate3d(' + wX + 'px, 0, 0)';
}

function horseRight(delta) {
    var speed = window.innerWidth / 1000;

    world.x -= speed * delta;

    var wX = Math.round(world.x);
    
    elHorse.x = -wX;

    elHorse.style.transform = 'translateX(-50%) scaleX(-1)';
    elHorse.style.left = elHorse.x + 'px';

    elWorld.style.transform = 'translate3d(' + wX + 'px, 0 ,0)';
}

function useCoin() {
    addCoin(elWorld, elHorse.x + 2  * window.innerWidth / 100, elHorse.y + 4 * window.innerWidth / 100);
}

function moveCoin(coin) {
    coin.x += coin.vX;
    coin.y += coin.vY;

    coin.vY += window.innerWidth / 5000;

    if (coin.y >= elWorld.clientHeight - coin.clientHeight) {
        coin.y = elWorld.clientHeight  - coin.clientHeight;
        coin.vX = 0;
        coin.vY = 0;
    }

    move(coin);
}

function move(el) {
    el.style.transform = 'translate3d(' + el.x + 'px, ' + el.y + 'px, 0) ';
}

var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    //elWorld.style.width = window.innerWidth * 3;

    // TODO: only do this on resize
    elHorse.x = -world.x;
    elHorse.y = elHorse.offsetTop;

    if (keys.left) {
        horseLeft(delta);

        elHorse.classList.add('run');
    } else if (keys.right) {
        horseRight(delta);

        elHorse.classList.add('run');
    } else {
        elHorse.classList.remove('run');
    }

    coins.forEach(moveCoin);

    requestAnimationFrame(update);
}