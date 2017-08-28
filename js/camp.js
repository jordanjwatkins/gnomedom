function addCamp(x) {
    var thing;

    // fire
    thing = addEntity({ x: x, y: uWorldHeight - 5, width: 7, height: 5, things: misc, className: 'campfire small' });

    // gnomes
    thing = addGnome(x - 10);

    thing.campX = thing.x;

    thing = addGnome(x + 10);

    thing.campX = thing.x;

    thing = addEntity({ x: x - 25, y: uWorldHeight - 7, width: 10, height: 7, things: misc, className: 'bush' });

    thing = addEntity({ x: x + 25, y: uWorldHeight - 7, width: 10, height: 7, things: misc, className: 'bush' });
}
