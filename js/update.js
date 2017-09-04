var lastFrameTimeMs, delta;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    keyMove();

    updateCoinTaker();

    //coins.forEach(updateCoin);

    for(let i = 0; i < coins.length; i++) {
        updateCoin(coins[i]);
    }

    ctx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);
    darknessCtx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);

    misc.forEach(maybeRender);

    //maybeRenderHorse(elHorse);

    for(let i = 0; i < gnomes.length; i++) {
        updateGnome(gnomes[i]);
    }

    projectiles.forEach(updateProjectile);

    updateDayNight();

    requestAnimationFrame(update);
}

function maybeRender(thing) {
    if (thing.className.match('campfire')) renderFire(thing);
    //if (thing.className.match('horse')) renderHorse(thing);
}

/*function maybeRenderHorse(thing) {
    if (thing.className.match('horse')) renderFire(thing);
}*/

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

let hour = 0;
let darkness = 0.9;

function updateDayNight() {
    hour += delta * 0.001;

    if (hour > 24) hour = 0;

    if (hour > 5 && hour < 17 && darkness > 0) {
        darkness -= 0.0001 * delta;
    } else if ((hour > 17 || hour < 5) && darkness < 0.8) {
        darkness += 0.0001 * delta;
    }

    if (darkness < 0) darkness = 0;
    if (darkness > 0.8) darkness = 0.8;

    renderDayNight();
}
