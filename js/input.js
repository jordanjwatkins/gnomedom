Object.assign(window, {
    keydown(e) {
        if (e.which == 37) keys.left = true;
        if (e.which == 39) keys.right = true;
        if (e.which == 38) keys.up = true;
        if (e.which == 40) test();
    },

    keyup(e) {
        if (e.which == 37) keys.left = false;
        if (e.which == 39) keys.right = false;
        if (e.which == 38) {
            keys.up = false;

            spendCoin(keys);
        }
    },

    test() {
        walls[0].health = 10;
        walls[0].destroyed = false;
        walls[0].classList.remove('destroyed');

        addGnome(elHorse.x / unit + 4);
    },

    keyMove() {
        if (keys.left) {
            horseMove(delta, 1);

           // elHorse.classList.add('run');
           // elGirl.classList.add('run');

            //elHorse.classList.remove('right');
            //elGirl.classList.remove('right');
        } else if (keys.right) {
            horseMove(delta, -1);

            //elHorse.classList.add('run', 'right');
            //elGirl.classList.add('run','right');
        } else {
            // don't remove first tick so 'run' image preloads correctly
            //if (delta > 0) elHorse.classList.remove('run');

            //elGirl.classList.remove('run');
        }

        if (keys.up) useCoins(keys);
    },
});
