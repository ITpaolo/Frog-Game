var menuState = {
        create: function() {

         var startscreen = game.add.sprite(0,100,'startscreen');
            startscreen.scale.setTo(0.5, 0.5);

         var image = game.add.sprite(328, 422, 'startgamebutton');
         image.anchor.set(0.5);
         image.scale.setTo(0.5, 0.5);
         image.inputEnabled = true;
         image.events.onInputDown.add(this.start, this);

    },

    start: function() {
        game.state.start('play');
    }

};