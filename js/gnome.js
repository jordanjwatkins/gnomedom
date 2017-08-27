var gnomes = [];
var gnomePool = [];
var filters = {
    poor: 'grayscale(100%) brightness(65%)',
    evil: 'hue-rotate(120deg) brightness(25%) drop-shadow(0 0 15px black)',
};

let gnome;

function addGnome(x, y, width, height) {
    gnome = addEntity({
        x, y, width, height,
        thingPool: gnomePool,
        things: gnomes,
        className: 'gnome',
    });

    // thrown like coin
    //gnome.vX = randomDirection() * unit / 12 + randomDirection() * Math.random() * unit / 12;
    //gnome.vY = -unit - Math.random();

    gnome.vX = 0;
    gnome.vY = 0;

    gnome.moveType = 'standing';
    gnome.moveType = 'falling';
    gnome.coins = 0;
    gnome.filter = 'poor';

    gnome.maxCoins = 1;

    gnome.style.filter = filters[gnome.filter]

    // gnome.style.filter = 'hue-rotate(120deg) brightness(45%)'; // zombie gnome
    
    gnome.defaultFilter = 'hue-rotate(' + Math.random() * 1000 + 'deg)'; // rainbow gnomes
}

function moveGnome(gnome) {
    if (!gnome.active) return;

    gnome.y = elWorld.clientHeight  - gnome.clientHeight;

    if (gnome.moveType === 'walking') {
        if (gnome.vX === 0)  {
            gnome.vX = randomDirection() * unit / 12;
            gnome.classList.add('walk');
        }

        (gnome.vX > 0) ? gnome.classList.add('right') : gnome.classList.remove('right');

        gnome.x += gnome.vX;
    }

    move(gnome);
}

function updateGnome(gnome) {
    if (gnome.coins > 0 && gnome.filter === 'poor') {
        gnome.filter = 'default';
        gnome.style.filter = gnome.defaultFilter;
    }

    if (gnome.moveType === 'falling') {
        return (gnome.vY !== 0) ? moveCoin(gnome) : gnome.moveType = 'walking';
    }

    if (gnome.moveType === 'walking') {
        maybeStartWallAttack(gnome, walls[0])
    }

    if (gnome.moveType === 'attack') attackWall(gnome, walls[0]);

    moveGnome(gnome);
}

function maybeStartWallAttack(gnome, wall) {
    if (wall && boxesCollide(gnome, wall) && !gnome.startingAttack) {
        console.log('hit wall');

        gnome.attackDirection = (gnome.vX > 0) ? 1 : -1;
        
        gnome.vX = (gnome.vX > 0) ? -0.05 * unit : 0.05 * unit;
        gnome.startingAttack = true;

        var random = 300 + 1200 * Math.random();
        
        setTimeout(function () {
            gnome.moveType = 'attack';
            gnome.classList.add('attack');
            (gnome.attackDirection === 1) ? gnome.classList.add('right') : gnome.classList.remove('right');
            gnome.vX = 0.001;
            gnome.attackTimer = Math.round(90 - (unit / 100) + random / 50);
        }, random);
    }
}
function attackWall(gnome, wall) {
    if (gnome.attackTimer === 0) {
        console.log('attack');
        
        wall.classList.add('shake');
        gnome.attackTimer = 63;
        wall.shaking = true;
        wall.health -= 1;

        setTimeout(function() {
            wall.classList.remove('shake');
            wall.shaking = false;
        }, 200);
    } else {
        gnome.attackTimer -= 1;
    }

    if (wall.health <= 0) {
        console.log('walking');

        wall.destroyed = true;
        wall.classList.add('destroyed');
        
        gnome.moveType = 'walking';
        gnome.classList.remove('attack');
        gnome.vX = 0;
    }
}