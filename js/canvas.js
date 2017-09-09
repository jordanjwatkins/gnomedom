//let light1 = 150;
//let light2;
let lightsOut;

function renderDayNight() {
    //light1 = 61 * unit + elWorld.x;

    //light2 = -2215 + elWorld.x;

    darken(0, 0, elCanvas.clientWidth, elCanvas.clientHeight, '#000000', darkness);

    misc.forEach((thing) => {
        if (thing.className === 'campfire' && thing.burning) {
            cutoutGradient(thing.x + 50 * unit + elWorld.x, elCanvas.clientHeight - 13 * unit, thing.radius, thing.intensity);
        }
    });

    walls.forEach((thing) => {
        if (!thing.destroyed) {
            cutoutGradient(thing.x + 50 * unit + elWorld.x, elCanvas.clientHeight - 18 * unit, 23 * unit, 0.8);
        }
    });
    //if (lightOnScreen(light1)) cutoutGradient(light1, elCanvas.clientHeight - 13 * unit, 15 * unit, 1);
    //if (lightOnScreen(light2)) cutoutGradient(light2, elCanvas.clientHeight - 13 * unit, 12 * unit, 0.5);

    ctx.drawImage(darknessCanvas, 0, 0);
}

function renderCoin(coin) {
    draw(coin);
}

let offset;

function renderWall(wall) {
    if (wall.sprite) {
        offset = (wall.shaking) ? -1 * unit : 0;
        (wall.destroyed) ? draw(wall, 0, offset) : draw(wall, 1, offset);
    } else {
        wall.sprite = images['wall'];
    }
}

function renderCoinFlower(thing) {
    thing.sprite = images['coinflower'];
    thing.sW = 3;
    thing.sH = 7;

    draw(thing, 0);
}

function renderFire(fire) {
    if (fire.sprite) {
        let timeValue = Math.tan(lastFrameTimeMs / 190);

        if (fire.burning) {
            if (timeValue < -0.66) {
                draw(fire, 1);
            } else if (timeValue > -0.66 && timeValue < 0.66) {
                draw(fire, 2);
            } else {
                draw(fire, 3);
            }
        } else {
            draw(fire, 0);
        }
    } else {
        fire.sprite = (fire.evil) ?  images['evilCampfire'] : images['campfire'];
    }
}

/*function renderHorse(horse) {
    if (horse.sprite) {
        //console.log('horse x', horse.x);
        spriteX = horse.x;
        spriteY = horse.y - 2 * unit;

        let timeValue = Math.tan(lastFrameTimeMs / 190);

        let deg = 7;
        let angleInRad = deg * Math.PI / 180;
        let tX = elCanvas.width / 2, tY = elCanvas.height / 2;

        //ctx.translate(tX, tY);
        //ctx.rotate(angleInRad);
        //ctx.translate(-(tX), -(tY));

        if (horse.burning) {
            if (timeValue < -0.66) {
                draw(horse, 0);
            } else if (timeValue > -0.66 && timeValue < 0.66) {
                draw(horse, 1);
            } else {
                draw(horse, 2);
            }
        } else {
            draw(horse, 0);
        }

        //ctx.translate(tX, tY);
        //ctx.rotate(-angleInRad);
        //ctx.translate(-(tX), -(tY));
    } else {
        horse.sprite =  images['horse'];
    }
}*/

function renderGnome(gnome) {
    if (gnome.sprite) {
        //if (gnome.vX > 0) gnome.sprite = images['gnomeWalk'];
        //if (gnome.vX < 0) gnome.sprite = images['flipped'];

        if (gnome.dead) {
            draw(gnome, 0, null, 5 * unit);
            gnome.active = false;

            return;
        }

        gnome.sprite = (gnome.filter === 'poor') ? images.poor : images.gnomeWalk;

        if (gnome.filter === 'evil') gnome.sprite = (gnome.coins >= gnome.maxCoins) ? images.evilRich : images.evil;

        if (gnome.moveType === 'walking') {
            if (Math.sin(lastFrameTimeMs / 100) > 0) {
                draw(gnome, 0);
            } else {
                draw(gnome, 1);
            }
        } else {
            gnome.sprite = (gnome.filter === 'poor') ? images.poor : images.gnomeStand;

            if (gnome.filter === 'evil') {
                gnome.sprite = (gnome.coins >= gnome.maxCoins) ? images.evilRich : images.evil;

                if (gnome.attacking) return draw(gnome, 0, 2 * unit * gnome.attackDirection);
            }

            draw(gnome, 0);
        }
    } else {
        gnome.sprite = images.poor;
    }
}

function draw(thing, frame, offset = 0, offsetY = 0) {
    if (!thing.sprite && !thing.color) return;

    spriteX = thing.x + elWorld.x + 50 * unit - thing.width / 2 + offset;

    if (spriteX < -thing.width || spriteX > currentWidth + thing.width) return; // off-screen

    if (thing.color) return drawRect(thing, spriteX);

    //spriteX = thing.x + elWorld.x;
    spriteY = thing.y + offsetY;

    ctx.drawImage(
        thing.sprite,
        frame * thing.sW, 0, thing.sW, thing.sH,
        Math.round(spriteX), spriteY,
        thing.width, thing.height
    );
}

function drawRect(thing, spriteX) {
    if (ctx.fillStyle !== thing.color) ctx.fillStyle = thing.color || '#000';

    ctx.fillRect(Math.round(spriteX), thing.y, thing.width, thing.height);
}

function lightOnScreen(light) {
    return (light > 0 - 4 * unit && light < currentWidth + 4 * unit);
}

function cutoutGradient(x, y, radius, brightness) {
    darknessCtx.save();
    darknessCtx.globalCompositeOperation = 'destination-out';
    var rnd = 0.05 * Math.sin(1.1 * Date.now() / 1000);
    radius = radius * (1 + rnd);
    var radialGradient = darknessCtx.createRadialGradient(x, y, 0, x, y, radius);
    radialGradient.addColorStop(0, `rgba(255, 0, 0, ${brightness})`);
    radialGradient.addColorStop(1, "rgba(255, 0, 0, 0)");
    darknessCtx.fillStyle = radialGradient;
    darknessCtx.beginPath();
    darknessCtx.arc(x, y, radius, 0, 2 * Math.PI);
    darknessCtx.fill();
    darknessCtx.restore();
}

function darken(x, y, w, h, darkenColor, amount) {
    darknessCtx.fillStyle = darkenColor;
    darknessCtx.globalAlpha = amount;
    darknessCtx.fillRect(x, y, w, h);
    darknessCtx.globalAlpha = 1;
}

function loadImage(url, name) {
    var img = new Image();

    img.src = url;

    img.onload = function () {
        console.log('image loaded', name);

        images[name] = img;

        if (images.gnomeWalk && !images.flipped) loadImage(flipImage(images.gnomeWalk), 'flipped');
        if (images.gnomeWalk && !images.poor) loadImage(flipImage(images.gnomeWalk, 'grayscale(90%)'), 'poor');
        if (images.gnomeWalk && !images.evil) loadImage(flipImage(images.gnomeWalk, 'brightness(5%)'), 'evil');
        if (images.evil && !images.evilRich) loadImage(flipImage(images.gnomeWalk, null, true), 'evilRich');

        if (images.campfire && !images.evilCampfire) loadImage(flipImage(images.campfire, 'brightness(5%)', null, 20, 4), 'evilCampfire');
    };
}

function flipImage(image, filter, coined, w, h) {
    var m_canvas = document.createElement('canvas');

    m_canvas.width = w || 14;
    m_canvas.height = h || 11;

    var m_context = m_canvas.getContext('2d');

    m_context.translate(w || 14, 0);
    m_context.scale(-1, 1);

    m_context.filter = filter;

    m_context.drawImage(image, 0, 0);

    if (coined) {
        m_context.fillStyle = '#FFFF00';
        m_context.fillRect(1, 5, 4, 5);

        m_context.fillRect(8, 5, 4, 5);
    }

    return m_canvas.toDataURL();
}

function createTransformed(image, w, h, transformFn) {
    var m_canvas = document.createElement('canvas');

    m_canvas.width = w;
    m_canvas.height = h;

    var m_context = m_canvas.getContext('2d');

    transformFn(m_context);

    m_context.drawImage(image, 0, 0);

    return m_canvas.toDataURL();
}

function darknessLayer() {
    darknessCanvas = document.createElement('canvas');
    darknessCanvas.width =  elCanvas.clientWidth;
    darknessCanvas.height = elCanvas.clientHeight;

    darknessCtx = darknessCanvas.getContext('2d');
}
