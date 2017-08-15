var coins = [];

function addCoin(elWorld, x, y) {
    var coin = document.createElement('div');

    coin.className = 'coin';

    coin.x = x;
    coin.y = y;

    coin.vX = 1 * window.innerWidth / 600 + Math.random() * window.innerWidth / 400;
    coin.vY = -1 * window.innerWidth / 600 - Math.random() * window.innerWidth / 110;

    console.log(coin.vY);

    coins.push(coin);

    elWorld.appendChild(coin);
}