var elHorse, elWorld, elGirl, currentWidth, worldHeight, unit, horseDirection, speed, wX, random;

var gnomeCoinPicker, horseCoinPicker;

var coins = [];
var coinPool = [];

var resizeDelta = 0;

var closeTargetDistance, distanceToTarget;

var keys = {
    left: false,
    right: false,
    up: false,
    upHold: 10,
};

var walls = [];
var misc = [];

var elNightLayer;

let elCanvas, ctx;
