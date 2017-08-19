function move(el, transforms) {
    transforms = transforms || '';
    el.style.transform = 'translate3d(' + el.x + 'px, ' + el.y + 'px, 0) ' + transforms;
}

function roundedMove(el, transforms) {
    transforms = transforms || '';
    
    //console.log('translate3d(' + Math.round(el.x) + 'px, ' + Math.round(el.y||0) + 'px, 0) ' + transforms);
    
    el.style.transform = 'translate3d(' + Math.round(el.x) + 'px, ' + Math.round(el.y||0) + 'px, 0) ' + transforms;
}

function boxesCollide(box1, box2) {
    //console.dir(box1);
    //console.dir(box2);

    if (box1 === box2) return false;

    return (
        box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.height + box1.y > box2.y
   );
}