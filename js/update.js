var lastFrameTimeMs, delta;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    loadGeneratedImages();

    clearCanvases();

    // update / render
    bg.forEach(maybeRender);

    coins.forEach(updateCoin);

    misc.forEach(maybeRender);

    walls.forEach(renderWall);

    gnomes.forEach(updateGnome);

    projectiles.forEach(updateProjectile);

    updateDayNight();

    renderCoinBar();

    updateCoinTaker();

    // game over - don't move when dead
    if (elHorse.coins < 0) {
        elHorse.classList.add('dead');
        document.body.classList.add('game-over');
    } else {
        keyMove();
    }

    // win
    if (elHorse.x < -690 * unit) {
        document.body.classList.add('win');
    }

    // start again next tick
    requestAnimationFrame(update);
}
