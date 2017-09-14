let elHorse, elWorld, currentWidth, worldHeight, unit, horseDirection, speed, wX, random, evilWall; //thing, spriteX, spriteY, uWorldHeight, gnome, coinTaker, prevTaker;

let gnomeCoinPicker, horseCoinPicker;

let closeTargetDistance, distanceToTarget;

let elNightLayer;

let elCanvas;

let darknessCanvas, darknessCtx;

let villagePos;

let coinBar, coinValue;

let night = false;

let fireLit = false; // gnomes will/won't chase coins
let mainFire;
let buildersExist;

const builderTasks = []; // check each and act on closest

const berries = [];

const coins = [];
const coinPool = [];

const gnomes = [];
const gnomePool = [];

const walls = [];
const misc = [];
const bg = [];

const projectilePool = [];
const projectiles = [];
const images = {};

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
