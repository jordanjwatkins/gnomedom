function addCamp(x) {
    const camp = {
        pop: 2,
    };

    // fire
    fire(x, 7, 5);

    // gnomes
    addGnome(x - 10).camp = camp;
    addGnome(x + 10).camp = camp;

    setInterval(function () {
        if (night && camp.pop < 2) {
            addGnome(x - 10 + 20 * Math.random());
            camp.pop++;
        }
    }, 30000);

    addEntity({ x: x + 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x + 38, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 35, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x + 45, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 49, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    addEntity({ x: x + 55, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 95, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    coinFlower(x + 41);
    coinFlower(x + 46);
    coinFlower(x + 48);
    coinFlower(x + 51);
    coinFlower(x + 58);
    coinFlower(x + 61);
    coinFlower(x + 66);
    coinFlower(x + 68);
    coinFlower(x + 71);
}

function coinFlower(x) {
    thing = addEntity({ x: x, width: 3, height: 7, things: misc, className: 'coinflower' });

    thing.sprite = images.coinflower;

    thing.sH = 7;
    thing.sW = 3;

    thing.canBePickedUp = true;
    thing.bloomHour = Math.random() * 24;
}
