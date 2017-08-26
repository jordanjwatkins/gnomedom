function resizeAll() {
    resizeDelta = currentWidth / window.innerWidth;

    setWorldSize();
    
    horseMove(0, horseDirection);

    coins.forEach(resizeCoin);
    gnomes.forEach(resizeCoin);
    walls.forEach(resizeCoin);
    
    walls.forEach(roundedMove);

    //misc.forEach(resizeCoin);
    //misc.forEach(roundedMove);
    
    //roundedMove(misc[0]);
    //roundedMove(misc[1]);

    // why doesn't forEach work correctly here?
    for(let i = 0; i < misc.length; i++) {
        resizeCoin(misc[i]);
        roundedMove(misc[i]);
    }
}