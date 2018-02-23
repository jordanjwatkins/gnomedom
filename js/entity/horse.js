function initHorse() {
    elHorse = document.querySelector('.horse');

    elHorse.y = elWorld.clientHeight - elHorse.clientHeight;
    elHorse.width = elHorse.clientWidth;
    elHorse.height = elHorse.clientHeight;

    horseMove(0, 1);

    elHorse.coins = 0;
    elHorse.active = true;
    elHorse.targetable = true;

    // preload running image to avoid visible flash
    elHorse.classList.add('run');
}

function horseMove(delta, direction) {
    speed = unit / 25;

    elWorld.x += Math.round(direction * speed * delta);

    elHorse.x = -elWorld.x - elHorse.width / 2;
}
