function addEntity(props) {
    var thing = (thingPool.length > 0) ? thingPool.pop() : document.createElement('div');

    thing.className = props.className;

    thing.x = x;
    thing.y = y;
    thing.width = unit * props.width;
    thing.height = unit * props.height;

    // thrown velocity
    //thing.vX = -(1 - Math.random()) * unit / 6 + Math.random() * unit / 4;
    //thing.vY = -1 * unit / 6 - unit * 0.5;

    
    //thing.falling = true;

    //thing.moveType = 'falling';

    // thing.style.filter = 'hue-rotate(120deg)'; // zombie thing
    //thing.style.filter = 'hue-rotate(' + Math.random() * 1000 + 'deg)'; // rainbow things

    thing.active = true;

    if (thing.inDom) return;

    thing.inDom = true;
    things.push(thing);
    elWorld.appendChild(thing);
}