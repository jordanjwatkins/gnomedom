var coins = [];
var coinPool = [];

function useCoins(keys) {
    if (elHorse.currentCoinTaker && keys.upHold > 30 && elHorse.currentCoinTaker.coins < elHorse.currentCoinTaker.maxCoins) {
        elHorse.currentCoinTaker.coins++;
        console.log('using coins', elHorse.currentCoinTaker, elHorse.currentCoinTaker.coins);

        const coin = addCoin(elHorse.x / unit + 4, elHorse.y / unit - 1, 2, 3);
        
        setTimeout(() => {
            coin.canBePickedUp = true;
        }, 10);

        keys.upHold = 0;
    }

    keys.upHold++;
}

function spendCoin(keys) {
    if (keys.upHold < 0) {
        addCoin(elHorse.x / unit + 4, elHorse.y / unit - 4, 2, 3);
        
    } else {
        if (elHorse.currentCoinTaker && elHorse.currentCoinTaker.coins < elHorse.currentCoinTaker.maxCoins) {
            for (let i = 0; i < elHorse.currentCoinTaker.coins; i++) {
                console.log(i);
                addCoin(elHorse.x / unit + 4, elHorse.y / unit - 4, 2, 3);
            }

            elHorse.currentCoinTaker.coins = 0;
        }
        /*const coin = addCoin(elHorse.x / unit + 4, elHorse.y / unit - 18, 2, 3);
        
        setTimeout(() => {
            coin.canBePickedUp = true;
        }, 10);

        keys.upHold = 0;*/
    }

    keys.upHold = 30;
}

function addCoin(x, y, width, height) {
    var coin = addEntity({
        x, y, width, height,
        thingPool: coinPool,
        things: coins,
        className: 'coin'
    });

    // thrown velocity
    coin.vX = randomDirection() * unit / 12 + randomDirection() * Math.random() * unit / 12;
    coin.vY = -unit / 2 - Math.random();

    coin.canBePickedUp = false;

    return coin;
}

function moveCoin(coin) {
    if (!coin.active) return;

    if (coin.y === elWorld.clientHeight  - coin.clientHeight) return;

    coin.x += coin.vX;
    coin.y += coin.vY;

    coin.vY += unit / 50;

    if (coin.y >= elWorld.clientHeight - coin.clientHeight) {
        coin.y = elWorld.clientHeight - coin.clientHeight;
        coin.vX = 0;
        coin.vY = 0;

        setTimeout(function () {
            if (coin) {
                coin.canBePickedUp = true;
            }
        }, 500);
    }

    move(coin);
}

function maybePickUpCoin(coin, picker) {
    if (!coin.active) return;

    if (
        coin.canBePickedUp && boxesCollide(coin, picker) //||
        //((picker.classList.contains('campfire') || picker.classList.contains('evil-campfire'))  && boxesCollide(coin, picker))
    ) {
        if (picker.maxCoins <= picker.coins) return;

        coin.classList.add('picked-up');
        coin.y = coin.y - 60 * unit;
        coin.canBePickedUp = false;
        picker.coins++;

        setTimeout(() => {
            coin.active = false;
            coin.className = 'out';
            coinPool.push(coin);
        }, 500);
    }
}

function makeCoinPicker(picker) {
    return function (coin) {
        maybePickUpCoin(coin, picker);
    }
}

function resizeCoin(coin) {
    if (!resizeDelta) return;

    console.log('coin', coin.y, coin.x, coin.clientHeight, coin.clientWidth, coin.className);

    coin.width = coin.width / resizeDelta;
    coin.height = coin.height / resizeDelta;

    coin.x = coin.x / resizeDelta;
    coin.y = elWorld.clientHeight - coin.height;
}