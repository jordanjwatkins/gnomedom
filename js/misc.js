function roundedMove(el, transforms) {
    transforms = transforms || '';

    el.style.transform = `translate3d(${Math.round(el.x + elWorld.x)}px, ${Math.round(el.y)}px, 0)`;
}

function boxesCollide(box1, box2) {
    if (box1 === box2) return false;

    //if(box2 === elHorse) console.log('box 2 horse collide');

    return (
        box1.x + 2 * unit < box2.x + box2.width &&
        box1.x - 2 * unit + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.height + box1.y > box2.y
    );
}

function randomDirection() {
    return (0.5 - Math.random() > 0) ? 1 : -1;
}
