var gameoverState = {
    create: function () {
        var imagegameover = game.add.sprite(320, 320, 'gameoverscreen');
        imagegameover.anchor.set(0.5);
        var gameoverLabel = stateText = game.add.text(500, 500, ' ', {font: '50px Arial', fill: '#2E2EFE'});
                            stateText.anchor.setTo(1.1, 0.2);

    },

    update: function () {
        if (sprite.body.y > 650) {
            stateText.text = "Click to restart";
            stateText.visible = true;

            game.input.onTap.addOnce(function () {
            game.state.start('menu');});
        }
    }
};
