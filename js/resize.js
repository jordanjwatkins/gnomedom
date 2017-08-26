function resizeAll() {
    resizeDelta = currentWidth / window.innerWidth;
    worldHeight = elWorld.clientHeight;

    setWorldSize();
    
    horseMove(0, horseDirection);

    coins.forEach(resizeThing);
    gnomes.forEach(resizeThing);
    walls.forEach(resizeThing);
    
    walls.forEach(roundedMove);

    //misc.forEach(resizeThing);
    //misc.forEach(roundedMove);
    
    //roundedMove(misc[0]);
    //roundedMove(misc[1]);

    // why doesn't forEach work correctly here?
    for(let i = 0; i < misc.length; i++) {
        resizeThing(misc[i]);
        roundedMove(misc[i]);
    }
}

function resizeThing(thing) {
    if (!resizeDelta) return;

    thing.width = thing.width / resizeDelta;
    thing.height = thing.height / resizeDelta;

    thing.x = thing.x / resizeDelta;
    thing.y = worldHeight - thing.height;
}