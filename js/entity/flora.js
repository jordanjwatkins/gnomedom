function bush(x) {
    thing = addEntity({ x: x, width: Math.random() * 40 + 2, height: Math.random() * 37 + 2, things: bg, className: 'bush' });

    thing.color = (Math.random() > 0.5) ? '#006400' : '#173300';
}

function coinTree(x, y) {
    y = y || 7;

    thing = addEntity({ x: x, width: 10 + 20 * Math.random(), height: 10 + 30 * Math.random(), things: bg, className: 'coinflower' });

    thing.skin = (Math.random() > 0.5) ? 'cointree' : 'cointree2';

    thing.sH = 3.5 + 0.5 * Math.random();
    thing.sW = 3;

    thing.tree = true;
}
