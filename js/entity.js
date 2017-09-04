function addEntity(props) {
    var thing = (props.thingPool && props.thingPool.length > 0) ? props.thingPool.pop() : document.createElement('div');

    thing.props = props;

    thing.className = props.className;

    thing.x = props.x * unit;
    thing.y = props.y * unit;
    thing.width = unit * props.width || thing.clientWidth;
    thing.height = unit * props.height || thing.clientHeight;

    thing.active = true;

    thing.coins = 0;
    thing.maxCoins = 0;

    thing.sated = false;

    if (!thing.inDom) {
        thing.inDom = true;
        props.things.push(thing);
        elWorld.appendChild(thing);
    }

    roundedMove(thing);

    return thing;
}
