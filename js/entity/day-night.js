let days = 1;
let hour = 4;
let darkness = 0.8;

night = true;

function updateDayNight() {
    hour += delta * 0.00038;

    if (hour > 24) {
        hour = 0;
        days++;
        document.querySelector('.day').innerHTML = `Day ${days}`;
    }

    if (hour > 6 && hour < 17 && darkness > 0) {
        if (night) {
            document.body.classList.add('dayStart');

            setTimeout(() => document.body.classList.remove('dayStart'), 9000);
        }

        night = false;
        darkness -= 0.00005 * delta;
    } else if ((hour > 17 || hour < 6) && darkness < 0.8) {
        night = true;
        darkness += 0.00005 * delta;
    }

    if (darkness < 0) darkness = 0;
    if (darkness > 0.8) darkness = 0.8;

    renderDayNight();
}
