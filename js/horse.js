function horseMove(delta, direction) {
    speed = unit / 25;

    elWorld.x += Math.round(direction * speed * delta);

    wX = -elWorld.x;

    elHorse.x = wX - elHorse.width / 2;
    elGirl.x = wX - elHorse.width / 4.9;

    horseDirection = direction;

    //move(elWorld);
    //roundedMove(elHorse);
    //roundedMove(elGirl);
}
