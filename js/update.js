var lastFrameTimeMs, delta, timestamp;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    keyMove();

    coins.forEach(moveCoin);

    // create method once for each coin
    coins.forEach(tryPickups);

    gnomes.forEach(updateGnome);

    requestAnimationFrame(update);
}

function tryPickups (coin) {
    maybePickUpCoin(coin, elHorse);

    misc.forEach((thing) => {
        if (thing.coins < thing.maxCoins) maybePickUpCoin(coin, thing);
        
        if (thing.coins >= thing.maxCoins) thing.classList.remove('dead');
    });

    gnomes.forEach((gnome) => {
        maybePickUpCoin(coin, gnome);
    });
}