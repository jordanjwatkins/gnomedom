var coins = [];

function useCoin() {
    addCoin(elWorld, elHorse.x + 2  * window.innerWidth / 100, elHorse.y + 4 * window.innerWidth / 100);
}

function addCoin(elWorld, x, y) {
    var coin = document.createElement('div');

    coin.className = 'coin';

    coin.x = x;
    coin.y = y;
    coin.width = window.innerWidth / 100 * 4;
    coin.height = window.innerWidth / 100 * 5;

    coin.vX = 1 * window.innerWidth / 600 + Math.random() * window.innerWidth / 400;
    coin.vY = -1 * window.innerWidth / 600 - Math.random() * window.innerWidth / 110;

    coins.push(coin);

    elWorld.appendChild(coin);
}

function moveCoin(coin) {
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
    if (coin.canBePickedUp && boxesCollide(coin, elHorse)) {
        coin.classList.add('picked-up');
        coin.y = coin.y - 10 * unit;
        //coin.style.display = 'none';
    }
}

function resizeCoin(coin) {
    if (!resizeDelta) return;

    coin.x = coin.x / resizeDelta;

    coin.width = unit * 2;
    coin.height = unit * 3;

    
}