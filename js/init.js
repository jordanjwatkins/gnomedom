function init() {
    elHorse = document.querySelector('.horse');
    elGirl = document.querySelector('.girl');
    elWorld = document.querySelector('.world');

    elFire = document.querySelector('.campfire');

    document.addEventListener('keydown', keydown);

    document.addEventListener('keyup', function (e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
        if (e.which == 38) {
            keys.up = false;
            spendCoin(keys);
        }
    });

    window.addEventListener('resize', resizeAll);

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