var elHorse, elWorld, elGirl, currentWidth, unit, horseDirection, speed, wX;

var resizeDelta = 0;

var keys = {
    left: false,
    right: false
}

var walls = [];

document.addEventListener('DOMContentLoaded', init);

function test() {
    console.log('test');

    walls[0].health = 10;
    walls[0].destroyed = false;
    walls[0].classList.remove('destroyed');
}

function init() {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');

    document.addEventListener('keydown', function (e) {
        if (e.which == 37) keys.left = true;
        if (e.which == 39) keys.right = true;
        if (e.which == 38) useCoin();
        if (e.which == 40) test();
    });

    document.addEventListener('keyup', function (e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
    });

    window.addEventListener('resize', function () {
        resizeDelta = currentWidth / window.innerWidth;

        setWorldSize();
        
        horseMove(0, horseDirection);

        coins.forEach(resizeCoin);
        gnomes.forEach(resizeCoin);
        walls.forEach(resizeCoin);

        walls.forEach(roundedMove);
    });

    setWorldSize();

    horseMove(0, 1);

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    document.body.classList = 'loaded';

    // test wall
    var wall = addEntity({ x: -50, y: elWorld.clientHeight / unit - 13, width: 4, height: 13, things: walls, className: 'wall' });

    wall.health = 10;
    console.log(wall.x, wall.y,wall.width,wall.height);

    roundedMove(wall);

    update();
}

function setWorldSize() {
    currentWidth = window.innerWidth;
    unit = currentWidth / 100;

    elWorld.x = (resizeDelta) ? elWorld.x / resizeDelta : 25 * unit;

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = (resizeDelta) ?  elHorse.width / resizeDelta : elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;
}

function horseMove(delta, direction) {
    speed = unit / 25;

    elWorld.x += Math.round(direction * speed * delta);

    wX = -elWorld.x;
    
    elHorse.x = wX - elHorse.width / 2;
    elGirl.x = wX - elHorse.width / 4.9;

    horseDirection = direction;

    move(elWorld);
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

    gnomes.forEach(updateGnome);

    requestAnimationFrame(update);
}