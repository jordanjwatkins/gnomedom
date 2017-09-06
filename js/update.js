var lastFrameTimeMs, delta;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    keyMove();

    updateCoinTaker();

    ctx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);
    darknessCtx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);

    coins.forEach(updateCoin);

    misc.forEach(maybeRender);
    walls.forEach(renderWall);

    gnomes.forEach(updateGnome);

    //projectiles.forEach(updateProjectile);

    updateDayNight();

    requestAnimationFrame(update);
}

function maybeRender(thing) {
    if (thing.className.match('campfire')) { renderFire(thing); }
    if (thing.className.match('bush')) { thing.color = '#006400'; draw(thing, 0); }
    //if (thing.className.match('horse')) renderHorse(thing);
}

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
            x: coinTaker.x / unit,
            y: coinTaker.y / unit - 15,
            width: 4, height: 4,
            things: misc,
            className: 'price',
        });

        console.log('coin taker x', coinTaker.x, coinTaker.price.x - 350);

        coinTaker.price.style.transform = 'translate3d(' + (coinTaker.price.x + elWorld.x - 350) + 'px, ' + (coinTaker.price.y || 0) + 'px, 0) ';

        //move(coinTaker.price);
    }

    if (!coinTaker.price.classList.contains('show')) {
        setTimeout(function () {
            coinTaker.price.classList.add('show');
        }, 0);
    }

    coinTaker.price.style.transform = 'translate3d(' + (coinTaker.price.x + elWorld.x - 350) + 'px, ' + (coinTaker.price.y || 0) + 'px, 0) ';

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
    } else if ((hour > 17 || hour < 5) && darkness < 0.9) {
        darkness += 0.0001 * delta;
    }

    if (darkness < 0) darkness = 0;
    if (darkness > 0.9) darkness = 0.9;

    renderDayNight();
}
