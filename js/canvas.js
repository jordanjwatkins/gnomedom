let light1 = 150;
let light2;
let lightsOut;

function renderDayNight() {
    light1 = 15 * unit + elWorld.x;

    light2 = -415 + (elWorld.x / (unit /3));

    darken(0, 0, elCanvas.clientWidth, elCanvas.clientHeight, '#000000', darkness);

    if (lightOnScreen(light1)) cutoutGradient(light1, elCanvas.clientHeight - 120, 12 * unit, 1);
    if (lightOnScreen(light2)) cutoutGradient(light2, 120, 50, 0.5);

    ctx.drawImage(darknessCanvas, 0, 0);
}

function renderFire(fire) {
    if (fire.sprite) {
        spriteX = fire.x + elWorld.x;
        spriteY = fire.y;

        let timeValue = Math.tan(lastFrameTimeMs / 190);

        if (fire.burning) {
            if (timeValue < -0.66) {
                ctx.drawImage(fire.sprite, 5, 0, 5, 4, Math.round(spriteX), spriteY, fire.width, fire.height);
            } else if (timeValue > -0.66 && timeValue < 0.66) {
                ctx.drawImage(fire.sprite, 10, 0, 5, 4, Math.round(spriteX), spriteY, fire.width, fire.height);
            } else {
                ctx.drawImage(fire.sprite, 15, 0, 5, 4, Math.round(spriteX), spriteY, fire.width, fire.height);
            }
        } else {
            ctx.drawImage(fire.sprite, 0, 0, 5, 4, Math.round(spriteX), spriteY, fire.width, fire.height);
        }
    } else {
        fire.sprite =  images['campfire'];
    }
}

function renderHorse(horse) {
    if (horse.sprite) {
        spriteX = horse.x;
        spriteY = horse.y - 2 * unit;

        let timeValue = Math.tan(lastFrameTimeMs / 190);

        if (horse.burning) {
            if (timeValue < -0.66) {
                ctx.drawImage(horse.sprite, 5, 0, 5, 4, Math.round(spriteX), spriteY, horse.width, horse.height);
            } else if (timeValue > -0.66 && timeValue < 0.66) {
                ctx.drawImage(horse.sprite, 10, 0, 5, 4, Math.round(spriteX), spriteY, horse.width, horse.height);
            } else {
                ctx.drawImage(horse.sprite, 15, 0, 5, 4, Math.round(spriteX), spriteY, horse.width, horse.height);
            }
        } else {
            ctx.drawImage(horse.sprite, 0, 0, 5, 4, Math.round(spriteX), spriteY, horse.width, horse.height);
        }
    } else {
        horse.sprite =  images['horse'];
    }
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
  img.src = url
  img.onload = function () {
    console.log('image loaded', name);
    images[name] = img;
    //ctx.drawImage(img, 0, 0, 100, 100);
    if (images.gnomeWalk && !images.flipped) loadImage(flipImage(images.gnomeWalk), 'flipped');
  }
}

function flipImage(image) {
    var m_canvas = document.createElement('canvas');
    m_canvas.width = 14;
    m_canvas.height = 14;
    var m_context = m_canvas.getContext('2d');

    m_context.translate(14, 0);
    m_context.scale(-1, 1);

    m_context.drawImage(image, 0, 0);

    //m_context.translate(-6, 0);
    //m_context.scale(-1, 1);
    //console.log(m_canvas.toDataURL());
    return m_canvas.toDataURL();
}

function darknessLayer() {
    darknessCanvas = document.createElement('canvas');
    darknessCanvas.width =  elCanvas.clientWidth;
    darknessCanvas.height = elCanvas.clientHeight;

    darknessCtx = darknessCanvas.getContext('2d');
}
