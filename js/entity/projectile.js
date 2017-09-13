function addProjectile(x, y, width, height) {
    var coin = addEntity({
        x, y, width, height,
        thingPool: projectilePool,
        things: projectiles,
        className: 'stone',
    });

    coin.color = '#333';

    // thrown velocity
    coin.vX = -3 * unit / 12 + randomDirection() * Math.random() * unit / 12;
    coin.vY = -unit / 4 - Math.random() * unit / 4;

    coin.canBePickedUp = true;

    return coin;
}

function updateProjectile(projectile) {
    moveProjectile(projectile);
    tryPickups(projectile);
}

function moveProjectile(projectile) {
    if (!projectile.active) return;

    projectile.vY += unit / 50;

    projectile.x += projectile.vX;
    projectile.y += projectile.vY;

    draw(projectile, 0);
}
