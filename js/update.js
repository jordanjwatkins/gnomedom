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

    const taker = elHorse.currentCoinTaker;
    const prevPrice = (taker) ? taker.price : null;

    if (taker) prevTaker = taker;

    elHorse.currentCoinTaker = null;

    misc.forEach(maybeSetCurrentCoinTaker);

    walls.forEach(maybeSetCurrentCoinTaker);

    updatePrice(elHorse.currentCoinTaker, prevPrice);
}

function maybeSetCurrentCoinTaker(thing) {
    if (thing.maxCoins <= 0 || thing.coins >= thing.maxCoins) return;

    if (boxesCollide(elHorse, thing)) {
        elHorse.currentCoinTaker = thing;
    }
}

function updatePrice(coinTaker, prevPrice) {
    if (!coinTaker) {
        if (prevPrice) prevPrice.classList.remove('show');

        return;
    }

    if (!coinTaker.price) {
        coinTaker.price = addEntity({
            x: coinTaker.x / unit + coinTaker.width / unit / 2 - 3,
            y: coinTaker.y / unit - 15,
            width: 4, height: 4,
            things: misc,
            className: 'price',
        });

        move(coinTaker.price);
    }

    if (!coinTaker.price.classList.contains('show')) {
        setTimeout(function () {
            coinTaker.price.classList.add('show');
        }, 0);
    }

    if (prevPrice && coinTaker.price !== prevPrice) prevPrice.classList.remove('show');

    if (+coinTaker.price.innerHTML !== coinTaker.maxCoins - coinTaker.coins) coinTaker.price.innerHTML = coinTaker.maxCoins - coinTaker.coins;
}
