var pausemenuState = {

    togglePause: function () {

        game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;

        if (game.physics.arcade.isPaused) {
            game.paused = true;
            imagepausemenupic = game.add.sprite(0, 0, 'imagepausemenupic');
            imagepausemenu = game.add.text(690, 250, ' Game Paused \n Press "Backspace" to continue', {font: '50px carrier_command', fill: '#FFFFFF'});
            imagepausemenu.anchor.set(0.5);
            imagepausemenu.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
            imagepausemenu.anchor.setTo(1.1, 0.2);
            PauseText.visible = false;
        } else {
            game.paused = false;
            imagepausemenu.visible = false;
            imagepausemenupic.visible = false;
            PauseText.visible = true;
        }
    }


};