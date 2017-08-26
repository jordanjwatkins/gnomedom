var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    keyMove();

    updateCoinTaker();

    coins.forEach(updateCoin);

    gnomes.forEach(updateGnome);

    requestAnimationFrame(update);
}

function updateCoinTaker() {
    // debounce?
    elHorse.currentCoinTaker = null;
    
    misc.forEach((thing) => {
        if (boxesCollide(elHorse, thing)) {
            if (thing.coins < thing.maxCoins) {
                elHorse.currentCoinTaker = thing;
            }
        }
    });
}