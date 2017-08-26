var elHorse, elWorld, elGirl, currentWidth, unit, horseDirection, speed, wX;
var gnomeCoinPicker, horseCoinPicker;
var resizeDelta = 0;

var elFire;

var keys = {
    left: false,
    right: false,
    up: false,
    upHold: 30,
}

var walls = [];
var misc = [];

document.addEventListener('DOMContentLoaded', init);

function test() {
    console.log('test');

    walls[0].health = 10;
    walls[0].destroyed = false;
    walls[0].classList.remove('destroyed');

    addGnome(elHorse.x / unit + 4, elHorse.y / unit - 4, 4, 6.3);
}

function init() {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');

    elFire = document.querySelector('.campfire');

    document.addEventListener('keydown', function (e) {
        if (e.which == 37) keys.left = true;
        if (e.which == 39) keys.right = true;
        if (e.which == 38) keys.up = true;
        if (e.which == 40) test();
    });

    document.addEventListener('keyup', function (e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
        if (e.which == 38) {
            keys.up = false;
            spendCoin(keys);
        }
    });

    window.addEventListener('resize', function () {
        resizeDelta = currentWidth / window.innerWidth;

        setWorldSize();
        
        horseMove(0, horseDirection);

        coins.forEach(resizeCoin);
        gnomes.forEach(resizeCoin);
        walls.forEach(resizeCoin);
        
        walls.forEach(roundedMove);

        //misc.forEach(resizeCoin);
        //misc.forEach(roundedMove);
        
        //roundedMove(misc[0]);
        //roundedMove(misc[1]);

        // why doesn't forEach work correctly here?
        for(let i = 0; i < misc.length; i++) {
            resizeCoin(misc[i]);
            roundedMove(misc[i]);
        }
    });

    setWorldSize();

    horseMove(0, 1);

    // preload running image to avoid visible flash
    elHorse.classList.add('run');

    // fade in after first tick positioning flash
    document.body.classList = 'loaded';

    addEntities();

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

    misc.forEach((thing) => {
        if (boxesCollide(elHorse, thing)) {
            if (thing.coins < thing.maxCoins) {
                console.log(thing);
                elHorse.currentCoinTaker = thing;
            }
        }
    });
    

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

    if (keys.up) useCoins(keys);
}

var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    keyMove();

    coins.forEach(moveCoin);

    // create method once for each coin
    coins.forEach(tryPickups);

    gnomes.forEach(updateGnome);

    requestAnimationFrame(update);
}

function tryPickups (coin) {
    maybePickUpCoin(coin, elHorse);

    misc.forEach((thing) => {
        if (thing.coins < thing.maxCoins) maybePickUpCoin(coin, thing);
        
        if (thing.coins >= thing.maxCoins) thing.classList.remove('dead');
    });

    gnomes.forEach((gnome) => {
        maybePickUpCoin(coin, gnome);
    });
}

function addEntities() {
    // test wall
    var wall = addEntity({ x: -50, y: elWorld.clientHeight / unit - 13, width: 4, height: 13, things: walls, className: 'wall' });

    wall.health = 10;
    
    //console.log(wall.x, wall.y, wall.width, wall.height);

    roundedMove(wall);

   // fire
    wall = addEntity({ x: -30, y: elWorld.clientHeight / unit - 8, width: 9, height: 8, things: misc, className: 'campfire dead' });

    wall.coins = 0;
    wall.maxCoins = 5;

    //console.log(wall.x, wall.y, wall.width, wall.height);

    roundedMove(wall);

     // evil fire
    wall = addEntity({ x: -70, y: elWorld.clientHeight / unit - 8, width: 10, height: 8, things: misc, className: 'evil-campfire dead 2' });

    wall.coins = 0;
    wall.maxCoins = 1;
    
    //console.log(wall.x, wall.y, wall.width, wall.height);

    roundedMove(wall);
}