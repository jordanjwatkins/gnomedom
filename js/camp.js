function addCamp(x) {
    var thing;

    // fire
    thing = addEntity({ x: x, y: uWorldHeight - 5, width: 7, height: 5, things: misc, className: 'campfire small' });

    thing.sW = 5;
    thing.sH = 4;
    thing.burning = true;

    // gnomes
    thing = addGnome(x - 10);

    thing = addGnome(x + 10);

    thing = addEntity({ x: x + 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    thing = addEntity({ x: x - 25, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    thing = addEntity({ x: x + 38, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    thing = addEntity({ x: x - 35, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    thing = addEntity({ x: x + 45, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    thing = addEntity({ x: x - 49, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });

    thing = addEntity({ x: x + 55, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
    thing = addEntity({ x: x - 95, width: Math.random() * 10 + 2, height: Math.random() * 37 + 2, things: misc, className: 'bush' });
}
