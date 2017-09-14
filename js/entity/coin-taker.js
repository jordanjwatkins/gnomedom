function updateCoinTaker() {
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

    if (mainFire.level < 2 && !thing.mainFire) return;
    if (!buildersExist && (thing.className === 'coinflower' || thing.className === 'wall')) return;

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
            x: coinTaker.x / unit - 20,
            y: coinTaker.y / unit - 20,
            width: 4, height: 4,
            things: misc,
            className: 'price',
        });
    }

    if (!coinTaker.price.classList.contains('show')) {
        setTimeout(function () {
            coinTaker.price.classList.add('show');
        }, 0);
    }

    roundedMove(coinTaker.price);

    if (prevPrice && coinTaker.price !== prevPrice) prevPrice.classList.remove('show');

    const price = [];

    for (let i = (coinTaker.maxCoins - coinTaker.coins); i > 0; i--) {
        price.push('&FilledSmallSquare; ');
    }

    if (+coinTaker.price.innerHTML !== coinTaker.maxCoins - coinTaker.coins) coinTaker.price.innerHTML = price.join('');
}
