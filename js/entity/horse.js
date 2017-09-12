function horseMove(delta, direction) {
    speed = unit / 25;

    elWorld.x += Math.round(direction * speed * delta);

    elHorse.x = -elWorld.x - elHorse.width / 2;
}
