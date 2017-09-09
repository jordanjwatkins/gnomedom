function addCamp(x) {
    var thing;

    // fire
    fire(x, 7, 5);

    // gnomes
    addGnome(x - 10);

    addGnome(x + 10);

    addEntity({ x: x + 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x + 38, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 35, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x + 45, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 49, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    addEntity({ x: x + 55, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    addEntity({ x: x - 95, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    addEntity({ x: x + 60, width: 2, height: 2, things: misc, className: 'coinflower' });
    coinFlower(x+ 60);
}

function coinFlower(x) {
    let thing = addEntity({ x: x + 60, width: 3, height: 7, things: misc, className: 'coinflower' });
    thing.sprite = images['coinflower'];

    thing.sH = 7;
    thing.sW = 3;
}
