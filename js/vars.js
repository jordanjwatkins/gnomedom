let elHorse, elWorld, elGirl, currentWidth, worldHeight, unit, horseDirection, speed, wX, random; //thing, spriteX, spriteY, uWorldHeight, gnome, coinTaker, prevTaker

let gnomeCoinPicker, horseCoinPicker;

let closeTargetDistance, distanceToTarget;

let elNightLayer;

let elCanvas;

let darknessCanvas, darknessCtx;

let villagePos;

let night = false;

const berries = [];

const coins = [];
const coinPool = [];

const gnomes = [];
const gnomePool = [];

const walls = [];
const misc = [];

const projectilePool = [];
const projectiles = [];
const images = {};

let resizeDelta = 0;

const keys = {
    left: false,
    right: false,
    up: false,
    upHold: 10,
};

const imageSizes = {
    gnomeWalk: [7, 11],
    horse: [5, 4],
    fire: [5, 4],
};
