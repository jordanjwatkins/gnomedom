function addEntity(props) {
    var thing = (props.thingPool && props.thingPool.length > 0) ? props.thingPool.pop() : document.createElement('div');

    //var thing = (props.thingPool && props.thingPool.length > 0) ? props.thingPool.pop() : {};

    //thing.props = props;

    props.things = props.things || misc;

    thing.className = props.className;

    thing.x = props.x * unit;
    thing.y = props.y * unit;
    thing.width = unit * props.width || thing.clientWidth;
    thing.height = unit * props.height || thing.clientHeight;

    if (!props.y) thing.y = worldHeight - thing.height;

    thing.active = true;

    thing.coins = 0;
    thing.maxCoins = 0;

    thing.sated = false;
    thing.level = 0;
    thing.buildTime = 800;
    thing.targetable = true;

    if (!thing.inDom && (thing.className === 'coin' || thing.className === 'price'/* || thing.className === 'gnome'*/)) {
        thing.inDom = true;

        elWorld.appendChild(thing);
    }

    if (!thing.inGroup) {
        thing.inGroup = true;
        props.things.push(thing);
    }

    return thing;
}
