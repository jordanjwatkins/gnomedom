function addProjectile(x, y, width, height) {
    var coin = addEntity({
        x, y, width, height,
        thingPool: projectilePool,
        things: projectiles,
        className: 'coin',
    });

    // thrown velocity
    coin.vX = randomDirection() * unit / 12 + randomDirection() * Math.random() * unit / 12;
    coin.vY = -unit / 2 - Math.random();

    coin.canBePickedUp = true;

    return coin;
}

function updateProjectile(projectile) {
    moveCoin(projectile);
    tryPickups(projectile);
}
