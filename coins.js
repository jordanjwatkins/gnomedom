var coins = [];

function addCoin(elWorld, x, y) {
    var coin = document.createElement('div');

    coin.className = 'coin';

    console.log(y);

    coin.x = x;
    coin.y = y;

    coin.vX = Math.random() * window.innerWidth / 300;
    coin.vY = -3 - (Math.random() * window.innerWidth / 100);

    console.log(coin.vY);

    coins.push(coin);

    elWorld.appendChild(coin);
}