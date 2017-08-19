var elHorse, elWorld, elGirl, currentWidth, unit, horseDirection;

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

    setWorldSize();

    horseMove(0, 1);

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    document.body.classList = 'loaded';

    update();
});

window.addEventListener('resize', function () {
    //console.log(currentWidth, window.innerWidth, unit);

    resizeDelta = currentWidth / window.innerWidth;

    currentWidth = window.innerWidth;

    setWorldSize();

    console.log(resizeDelta, unit);
    
    horseMove(0, horseDirection);

    coins.forEach(resizeCoin);
});


function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;

    elWorld.x = (resizeDelta) ? elWorld.x / resizeDelta : world.x;
    //elWorld.x = 25 * window.innerWidth / 100;
    

    elHorse.x = -elWorld.x - 4 * unit;
    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;

    console.log(elHorse.y, elHorse.x, elHorse.width, elHorse.height);
}

function horseMove(delta, direction) {
    var speed = window.innerWidth / 1000;

    elWorld.x += direction * speed * delta;

    var wX = Math.round(elWorld.x);
    
    elHorse.x = -wX - 4 * unit;
    elGirl.x = -wX;

    horseDirection = direction;

    roundedMove(elWorld);

    roundedMove(elHorse, 'scaleX(' + direction + ')');
    roundedMove(elGirl, 'scaleX(' + direction + ')');
}

var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    // TODO: only do this on resize
    // TODO: scale all entity positions on width changes
    elHorse.x = -elWorld.x;
    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;

    if (keys.left) {
        horseMove(delta, 1);

        elHorse.classList.add('run');
        elGirl.classList.add('run');
    } else if (keys.right) {
        horseMove(delta, -1);

        elHorse.classList.add('run', 'right');
        elGirl.classList.add('run','right');
    } else {
        // don't remove first tick so 'run' image preloads correctly
        if (delta > 0) elHorse.classList.remove('run');

        elGirl.classList.remove('run', 'right');
        
        roundedMove(elGirl, 'scaleX(' + horseDirection + ')');
    }

    coins.forEach(moveCoin);

    coins.forEach(maybePickUpCoin);

    requestAnimationFrame(update);
}