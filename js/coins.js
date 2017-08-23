var coins = [];
var coinPool = [];

function useCoin() {
    console.log(elHorse, elHorse.x, unit + 4);
    addCoin(elHorse.x / unit + 4, elHorse.y / unit - 4, 2, 3);

    addGnome(elHorse.x / unit + 4, elHorse.y / unit - 4, 4, 6.3);
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

function maybePickUpCoin(coin) {
    if (!coin.active) return;

    if (coin.canBePickedUp && boxesCollide(coin, elHorse)) {
        coin.classList.add('picked-up');
        coin.y = coin.y - 60 * unit;
        coin.canBePickedUp = false;

        setTimeout(() => {
            coin.active = false;
            coin.className = 'out';
            coinPool.push(coin);
        }, 500);
    }
}

function resizeCoin(coin) {
    if (!resizeDelta) return;

    console.log('coin', coin.y);

    coin.x = coin.x / resizeDelta;
    coin.y = coin.y / resizeDelta;
    //coin.y = elWorld.clientHeight - coin.clientHeight;

    coin.width = coin.width / resizeDelta;
    coin.height = coin.height / resizeDelta;
}