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
    let taker = elHorse.currentCoinTaker;
    let prevPrice;

    // debounce?
    if (taker && taker.price) prevPrice = taker.price;

    elHorse.currentCoinTaker = null;

    misc.forEach((thing) => {
        if (boxesCollide(elHorse, thing)) {
            if (thing.coins < thing.maxCoins) {
                elHorse.currentCoinTaker = thing;
            }
        }
    });

    if (!elHorse.currentCoinTaker) {
        if (prevPrice) prevPrice.classList.remove('show');

        return;
    } 

    if (!elHorse.currentCoinTaker.price) {
        elHorse.currentCoinTaker.price = addEntity({
            //x, y, width, height,
            x: elHorse.currentCoinTaker.x / unit, 
            y: elHorse.currentCoinTaker.y / unit - 15,
            width: 4, height: 4,
            things: misc,
            className: 'price',
        });

        setTimeout(function () {
            if (!elHorse.currentCoinTaker.price.classList.contains('show')) elHorse.currentCoinTaker.price.classList.add('show');
        }, 0);
    } else if (!elHorse.currentCoinTaker.price.classList.contains('show')) elHorse.currentCoinTaker.price.classList.add('show');

    if (prevPrice && elHorse.currentCoinTaker.price !== prevPrice) prevPrice.classList.remove('show');

    elHorse.currentCoinTaker.price.innerHTML = elHorse.currentCoinTaker.maxCoins - elHorse.currentCoinTaker.coins;

    move(elHorse.currentCoinTaker.price);
}