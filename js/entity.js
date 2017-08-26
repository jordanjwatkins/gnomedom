function addEntity(props) {
    var thing = (props.thingPool && props.thingPool.length > 0) ? props.thingPool.pop() : document.createElement('div');

    thing.className = props.className;

    thing.x = props.x * unit;
    thing.y = props.y * unit;
    thing.width = unit * props.width || thing.clientWidth;
    thing.height = unit * props.height || thing.clientHeight;

    console.log(thing.x, thing.y);

    thing.active = true;
    thing.maxCoins = 0;

    if (!thing.inDom) {
        thing.inDom = true;
        props.things.push(thing);
        elWorld.appendChild(thing);
    }

    return thing
}