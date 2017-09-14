function evilCamp() {
    coinFlower(-593);

    // evil wall
    thing = addEntity({ x: -620, width: 40, height: 40, className: 'evilWall' });
    thing.evil = true;
    thing.sW = 4;
    thing.sH = 4;

    evilWall = thing;

    // evil fire
    thing = fire(-569, 13, 17);
    thing.evil = true;
    thing.burning = true;

    const evilFire = thing;

    // spawn evils
    let evils = 0;

    thing.spawner = setInterval(spawn, 4000);

    spawn();

    function spawn(x, extra) {
        x = x || -569;

        if (!(hour > 15 || hour < 6)) return evils = 0;
        if (evils > days - 1) return;
        if (!evilFire.burning) return;

        if (!extra) evils++;

        thing = addGnome(-569);
        thing.filter = 'evil';
        thing.moveType = 'walking';
        thing.speed = unit / 1.8;

        // avoid evil not appearing when horse is over fire during spawn
        const t = thing;

        t.leftHome = false;

        setTimeout(function () {
            t.leftHome = true;

            if (extra) return;

            // ramp up wave numbers
            if (days > 8) {
                setTimeout(() => spawn(null, true), 500);
            }

            if (days > 15) {
                setTimeout(() => spawn(null, true), 900);
            }
        }, 500);
    }
}
