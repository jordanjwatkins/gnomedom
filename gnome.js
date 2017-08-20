var gnomes = [];
var gnomePool = [];

function addGnome(elWorld, x, y) {
    console.log(gnomePool);
    var gnome = (gnomePool.length > 0) ? gnomePool.pop() : document.createElement('div');

    gnome.className = 'gnome';

    gnome.x = x;
    gnome.y = y;
    gnome.width = unit * 2;
    gnome.height = unit * 3;

    gnome.vX = -(1 - Math.random()) * unit / 6 + Math.random() * unit / 4;
    gnome.vY = -1 * unit / 6 - unit * 0.5;

    gnome.active = true;
    gnome.canBePickedUp = false;

    if (gnome.inDom) return;

    gnome.inDom = true;
    gnomes.push(gnome);
    elWorld.appendChild(gnome);
}