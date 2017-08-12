var elHorse, elWorld;

var world = { x: 50 };

var horse = { x: 10 };

var keys = {
    left: false,
    right: false
}

document.addEventListener('DOMContentLoaded', function () {
    elHorse = document.querySelector('.horse');
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

    update();
});

function horseLeft() {
    horse.x -= 10;
    world.x -= 1;

    //elHorse.style.left = horse.x + 'px';
    elHorse.style.transform = 'translateX(-50%) scaleX(-1)';
    elWorld.style.left = world.x + '%';
}

function horseRight() {
    horse.x += 10;
    world.x += 1;

    elHorse.style.transform = 'translateX(-50%) scaleX(1)';

    elWorld.style.left = world.x + '%';
}

function useCoin() {
    
}

function update() {
    if (keys.left) {
        horseRight();

        elHorse.classList.add('run');
    } else if (keys.right) {
        horseLeft();

        elHorse.classList.add('run');
    } else {
        elHorse.classList.remove('run');
    }

    

    requestAnimationFrame(update);
}