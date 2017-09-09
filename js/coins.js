function useCoins(keys) {
    coinTaker = elHorse.currentCoinTaker;

    if (!coinTaker || elHorse.coins <= 0) return;

    if (coinTaker && keys.upHold > 30 && coinTaker.coins < coinTaker.maxCoins) {
        coinTaker.coins++;

        if (coinTaker.coins === coinTaker.maxCoins && !coinTaker.sated) {
            if (coinTaker.levelUp) coinTaker.levelUp();

            coinTaker.sated = true;
        }

        elHorse.coins -= 1;

        const coin = addCoin(elHorse.x / unit + 4, elHorse.y / unit - 1, 2, 3);

        setTimeout(() => {
            coin.canBePickedUp = true;
            elHorse.coins -= 1; // currently spend effect is based on picking the coin up, so an extra -1 to counterbalance
        }, 30);

        keys.upHold = 0;
    }

    keys.upHold++;
}

function spendCoin(keys) {
    console.log(elHorse.coins);

    coinTaker = elHorse.currentCoinTaker;

    if (coinTaker && coinTaker.coins < coinTaker.maxCoins && coinTaker.coins > 0) {
        for (let i = 0; i < coinTaker.coins; i++) {
            addCoin(elHorse.x / unit + 4, elHorse.y / unit - 4, 2, 3);
        }

        coinTaker.coins = 0;
    } else if (elHorse.coins > 0) {
        elHorse.coins--;

        addCoin(elHorse.x / unit + 4, elHorse.y / unit - 4, 2, 3);
    }

    keys.upHold = 0;
}

function addCoin(x, y, width, height) {
    var coin = addEntity({
        x, y, width, height,
        thingPool: coinPool,
        things: coins,
        className: 'coin',
    });

    // thrown velocity
    coin.vX = randomDirection() * unit / 12 + randomDirection() * Math.random() * unit / 12;
    coin.vY = -unit / 2 - Math.random();

    coin.canBePickedUp = false;

    setTimeout(() => coin.classList.add('in'), 20);

    return coin;
}

function moveCoin(coin) {
    //if (!coin.active) return;

    //if (coin.y === elWorld.clientHeight  - coin.clientHeight) return;

    coin.x += coin.vX;
    coin.y += coin.vY;

    coin.vY += unit / 50;

    if (coin.y >= elWorld.clientHeight - coin.clientHeight) {
        coin.y = elWorld.clientHeight - coin.clientHeight;
        coin.vX = 0;
        coin.vY = 0;

        setTimeout(function () {
            if (coin && coin.active) {
                coin.canBePickedUp = true;
            }
        }, 500);
    }

    coin.style.transform = `translate3d(${(coin.x + elWorld.x - 350)}px, ${(coin.y || 0)}px, 0) `;
}

function maybePickUpCoin(coin, picker) {
    if (!coin.active) return;

    if (coin.canBePickedUp && coin.className === 'stone' && picker.filter === 'evil' && !picker.dead && boxesCollide(coin, picker)) {
        picker.health--;

        if (picker.health < 0) {
            picker.dead = true;
        }

        coin.canBePickedUp = false;

        setTimeout(() => {
            coin.active = false;
        }, 50);

        console.log('yowch!!!');

        return;
    }

    if (coin.className === 'stone') return;

    if (coin.canBePickedUp && boxesCollide(coin, picker)) {
        if (picker.maxCoins <= picker.coins) return;

        coin.canBePickedUp = false;
        picker.coins++;
        coin.vX = 0;
        coin.active = false;

        setTimeout(() => {
            coin.y = coin.y - 40 * unit;
            coin.classList.add('picked-up');
        }, 30);

        setTimeout(() => {
            coin.className = 'out';
            coinPool.push(coin);
        }, 900);
    }
}

function makeCoinPicker(picker) {
    return function (coin) {
        maybePickUpCoin(coin, picker);
    };
}

function tryPickups(coin) {
    maybePickUpCoin(coin, elHorse);

    gnomes.forEach((gnome) => {
        maybePickUpCoin(coin, gnome);
    });
}

function updateCoin(coin) {
    moveCoin(coin);
    tryPickups(coin);
}
