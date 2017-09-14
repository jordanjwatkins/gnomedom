function addCamp(x) {
    const camp = {
        pop: 2,
        x,
    };

    fire(x, 7, 5);

    bushes(x);

    addGnome(x - 10).camp = camp;
    addGnome(x + 10).camp = camp;

    campRespawnCycle(camp);

    coinFlower(x - 80);
    coinFlower(x - 150);
}

function campRespawnCycle(camp) {
    setInterval(function () {
        if (night && camp.pop < 2) {
            addGnome(camp.x - 10 + 40 * Math.random()).camp = camp;
            camp.pop++;
        }
    }, 30000);
}

function bushes(x) {
    [
        x + 25, x - 25, x + 38,
        x - 35, x + 45, x - 49,
        x + 55, x - 95, x + 97,
        x + 110, x - 120, x - 130,
        x - 150, x - 170, x - 200,
        x - 220, x - 460, x - 380,
        x - 420,
    ].forEach(bush);
}
