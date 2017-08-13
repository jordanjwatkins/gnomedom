var elHorse, elWorld;

var world = { x: -50 };

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

function horseLeft(delta) {
    world.x += 0.05 * delta;

    elHorse.style.transform = 'translateX(' + -world.x + 'vw) scaleX(1)';
    //elHorse.style.left =  -world.x + '%';
    elHorse.classList.remove('right');
    
    elWorld.style.transform = 'translate3d(' + world.x + 'vw, 0, 0)';
}

function horseRight(delta) {
    world.x -= 0.05 * delta;

    elHorse.style.transform =  'translateX(' + -world.x + 'vw) scaleX(-1)';
    elHorse.classList.add('right');
    //elHorse.style.left = -world.x + 'vw';

    elWorld.style.transform = 'translate3d(' + world.x + 'vw, 0 ,0)';
}

function useCoin() {
    
}

var lastFrameTimeMs, delta, timestamp;
function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    if (keys.left) {
        horseLeft(delta);

        elHorse.classList.add('run');
    } else if (keys.right) {
        horseRight(delta);

        elHorse.classList.add('run');
    } else {
        elHorse.classList.remove('run');
    }

    

    requestAnimationFrame(update);
}