var gnomes = [];
var gnomePool = [];

function addGnome(x, y, width, height) {
    addEntity({ x, y, width, height })
    //var gnome = (gnomePool.length > 0) ? gnomePool.pop() : document.createElement('div');

    //gnome.className = 'gnome';

    gnome.x = x;
    gnome.y = y;
    gnome.width = unit * 4;
    gnome.height = unit * 6.3;

    // thrown velocity
    gnome.vX = -(1 - Math.random()) * unit / 6 + Math.random() * unit / 4;
    gnome.vY = -1 * unit / 6 - unit * 0.5;

    //gnome.active = true;
    //gnome.falling = true;

    gnome.moveType = 'falling';

    // gnome.style.filter = 'hue-rotate(120deg)'; // zombie gnome
    gnome.style.filter = 'hue-rotate(' + Math.random() * 1000 + 'deg)'; // rainbow gnomes

    /*if (gnome.inDom) return;

    gnome.inDom = true;
    gnomes.push(gnome);
    elWorld.appendChild(gnome);*/
}

function moveGnome(gnome) {
    if (!gnome.active) return;

    if (gnome.moveType !== 'walking') return;

    gnome.y = elWorld.clientHeight  - gnome.clientHeight;
    
    if (gnome.vX === 0)  {
        gnome.vX = -(1 - Math.random()) * 0.1 * unit + 0.1 * unit * Math.random();
        gnome.classList.add('walk');
    }

    (gnome.vX > 0) ? gnome.classList.add('right') : gnome.classList.remove('right');

    gnome.x += gnome.vX;

    move(gnome);
}