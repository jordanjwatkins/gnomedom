var elHorse, elWorld, elGirl, currentWidth, unit, resizeDelta, horseDirection;

var world = { x: 25 * window.innerWidth / 100 };

var keys = {
    left: false,
    right: false
}

document.addEventListener('DOMContentLoaded', function () {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;

    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');


    elWorld.x = 25 * window.innerWidth / 100;

    elHorse.x = -elWorld.x;
    elHorse.y = elHorse.offsetTop;

    elGirl.transforms = [];

    document.addEventListener('keydown', function (e) {
        if (e.which == 37) keys.left = true;
        if (e.which == 39) keys.right = true;
        if (e.which == 38) useCoin();
    });

    document.addEventListener('keyup', function (e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
    });

    horseMove(0, 1);

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    update();
});

window.addEventListener('resize', function () {
    console.log(currentWidth, window.innerWidth, unit);
    
    unit = window.innerWidth / 100;

    resizeDelta = currentWidth / window.innerWidth;

    console.log(resizeDelta, unit);
});

function horseMove(delta, direction) {
    var speed = window.innerWidth / 1000;

    elWorld.x += direction * speed * delta;

    var wX = Math.round(elWorld.x);
    
    elHorse.x = -wX;
    elGirl.x = -wX;

    elHorse.style.transform = 'translateX(-50%) scaleX(' + direction + ')';
    elHorse.style.left = elHorse.x + 'px';

    horseDirection = direction;

    //elHorse.appendChild(elGirl);

    //elGirl.transforms.push('scaleX = 1;

    roundedMove(elGirl, 'scaleX(' + direction + ') rotate(3deg)');
    roundedMove(elWorld);
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

var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    // TODO: only do this on resize
    // TODO: scale all entity positions on width changes
    elHorse.x = -elWorld.x;
    elHorse.y = elHorse.offsetTop;

    if (keys.left) {
        horseMove(delta, 1);

        elHorse.classList.add('run');
    } else if (keys.right) {
        horseMove(delta, -1);

        elHorse.classList.add('run');
    } else {
        elHorse.classList.remove('run');
        roundedMove(elGirl, 'scaleX(' + horseDirection + ') rotate(0deg)');
    }

    coins.forEach(moveCoin);

    requestAnimationFrame(update);
}