var coins = [];
var coinPool = [];

function useCoin() {
    addCoin(elHorse.x + 4 * unit, elHorse.y + 4 * unit);

    addGnome(elHorse.x + 4 * unit, elHorse.y - 4 * unit);
}

function addCoin(x, y) {
    var coin = (coinPool.length > 0) ? coinPool.pop() : document.createElement('div');

    coin.className = 'coin';

    coin.x = x;
    coin.y = y;
    coin.width = unit * 2;
    coin.height = unit * 3;

    coin.vX = -(1 - Math.random()) * unit / 6 + Math.random() * unit / 4;
    coin.vY = -1 * unit / 6 - unit * 0.5;

    coin.active = true;
    coin.canBePickedUp = false;

    if (coin.inDom) return;

    coin.inDom = true;
    coins.push(coin);
    elWorld.appendChild(coin);
}

function moveCoin(coin) {
    if (!coin.active) return;

    if (coin.y === elWorld.clientHeight  - coin.clientHeight) return;

    coin.x += coin.vX;
    coin.y += coin.vY;

    coin.vY += window.innerWidth / 5000;

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

    coin.x = coin.x / resizeDelta;

    coin.width = coin.width / resizeDelta;
    coin.height = coin.height / resizeDelta;
}