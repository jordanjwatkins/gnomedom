function addCamp(x) {
    var thing;

    // fire
    thing = addEntity({ x: x, y: uWorldHeight - 5, width: 7, height: 5, things: misc, className: 'campfire small' });

    roundedMove(thing);

    // gnomes
    addGnome(x - 10, uWorldHeight - 6.3, 4, 6.3);
    addGnome(x + 10, uWorldHeight - 6.3, 4, 6.3);
}
// fire
