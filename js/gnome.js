var gnomes = [];
var gnomePool = [];

function addGnome(x, y, width, height) {
    console.log(x, y, width, height);
    var gnome = addEntity({
        x, y, width, height,
        thingPool: gnomePool,
        things: gnomes,
        className: 'gnome'
    });

    // thrown like coin
    gnome.vX = randomDirection() * unit / 12 + randomDirection() * Math.random() * unit / 12;
    gnome.vY = -unit - Math.random();

    gnome.moveType = 'falling';

    // gnome.style.filter = 'hue-rotate(120deg) brightness(45%)'; // zombie gnome
    
    gnome.style.filter = 'hue-rotate(' + Math.random() * 1000 + 'deg)'; // rainbow gnomes

    gnome.style.filter = 'grayscale(30%) brightness(75%)'; // poor gnomes

    gnome.style.filter = 'hue-rotate(120deg) brightness(25%) drop-shadow(0 0 15px black)';
}

function moveGnome(gnome) {
    if (!gnome.active || gnome.moveType !== 'walking') return;

    gnome.y = elWorld.clientHeight  - gnome.clientHeight;
    
    if (gnome.vX === 0)  {
        gnome.vX = randomDirection() * unit / 12;
        gnome.classList.add('walk');
    }

    (gnome.vX > 0) ? gnome.classList.add('right') : gnome.classList.remove('right');

    //if(gnome.vX > 0) gnome.vX = 0.01;

    gnome.x += gnome.vX;

    move(gnome);
}

function updateGnome(gnome) {
    if (gnome.moveType === 'falling') {
        return (gnome.vY !== 0) ? moveCoin(gnome) : gnome.moveType = 'walking';
    }

    if (gnome.moveType === 'walking') {
        if (walls[0] && boxesCollide(gnome, walls[0]) && !gnome.startingAttack) {
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
                console.log(gnome.attackTimer);
            }, random);
        }
    }

    if (gnome.moveType === 'attack') {
        if (gnome.attackTimer === 0) {
            console.log('attack');
            walls[0].classList.add('shake');
            gnome.attackTimer = 63;
            walls[0].shaking = true;
            walls[0].health -= 1

            setTimeout(function() {
                walls[0].classList.remove('shake');
                walls[0].shaking = false;
            }, 200);
        } else {
            gnome.attackTimer -= 1;
        }

        if (walls[0].health <= 0) {
            console.log('walking');

            walls[0].destroyed = true;
            walls[0].classList.add('destroyed');
            
            gnome.moveType = 'walking';
            gnome.classList.remove('attack');
            gnome.vX = 0;
        }
    }

    moveGnome(gnome);
}