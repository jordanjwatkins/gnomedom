function handlePoor(gnome) {
    if (!fireLit) return;

    if (gnome.coins > 0) {
        gnome.filter = 'green';

        headHome(gnome);

        if (gnome.camp && gnome.camp.pop) gnome.camp.pop--;

        return;
    }

    if (gnome.wait > 0) {
        gnome.wait--;

        return;
    } else {
        gnome.wait = 7;
    }

    // coin sense radius
    closeTargetDistance = 50 * unit;

    if (!gnome.closeTarget || !gnome.closeTarget.active) gnome.closeTarget = null;

    coins.forEach(function (coin) {
        tryForCloserTarget(gnome, coin);
    });

    chooseWalkTarget(gnome);
}
