var lastFrameTimeMs, delta;

function update(timestamp) {
    delta = (lastFrameTimeMs) ? timestamp - lastFrameTimeMs: 0;

    lastFrameTimeMs = timestamp;

    updateCoinTaker();

    ctx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);
    darknessCtx.clearRect(0, 0, elCanvas.clientWidth, elCanvas.clientHeight);

    coins.forEach(updateCoin);

    misc.forEach(maybeRender);
    walls.forEach(renderWall);

    gnomes.forEach(updateGnome);

    projectiles.forEach(updateProjectile);

    updateDayNight();

    renderCoinBar();

    // game over
    if (elHorse.coins < 0) {
        elHorse.classList.add('dead');
        document.body.classList.add('game-over');
    } else if (elHorse.x < -390 * unit) {
        document.body.classList.add('win');
    } else {
        keyMove();
    }

    requestAnimationFrame(update);
}

function maybeRender(thing) {
    if (thing.className.match('campfire')) return renderFire(thing);
    if (thing.className.match('coinflower')) return renderCoinFlower(thing);
    if (thing.className.match('bar')) return renderCoinBar(thing);
    if (thing.className.match('wave1')) return renderWave1(thing);
    if (thing.className.match('water')) return renderWater(thing);
    if (thing.className.match('evilWall')) return renderEvilWall(thing);

    if (thing.className.match('bush')) thing.color = '#006400';

    if (thing.color) draw(thing, 0);
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

    let price = [];

    for (var i = (coinTaker.maxCoins - coinTaker.coins); i > 0; i--) {
        price.push('&bull; ')
    }

    if (+coinTaker.price.innerHTML !== coinTaker.maxCoins - coinTaker.coins) coinTaker.price.innerHTML = price.join('');
}

let days = 4;
let hour = 4;
let darkness = 0.8;
night = true;

function updateDayNight() {
    hour += delta * 0.0003;

    //console.log(hour);

    if (hour > 24) {
        hour = 0;
        days++;
        document.querySelector('.day').innerHTML = `Day ${days}`;
    }

    if (hour > 5 && hour < 17 && darkness > 0) {
        if (night) {
            document.body.classList.add('dayStart');
            setTimeout(() => { document.body.classList.remove('dayStart'); }, 9000);
        }

        night = false;
        darkness -= 0.00005 * delta;
    } else if ((hour > 17 || hour < 5) && darkness < 0.8) {
        night = true;
        darkness += 0.00005 * delta;
    }

    if (darkness < 0) darkness = 0;
    if (darkness > 0.8) darkness = 0.8;

    renderDayNight();
}
