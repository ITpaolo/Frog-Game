var loadState = {
    preload: function() {

        var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
        var tilemapdebug = this.game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);


        this.game.load.image('floor', 'floor.png');

        this.game.load.spritesheet('water', 'water_animated.png', 32, 32);
        this.game.load.spritesheet('frog', 'frog.png', 32, 32);
        this.game.load.image('startscreen', 'startscreen.png');
        this.game.load.image('startgamebutton', 'startgamebutton.png');
    },

    create: function() {
        game.state.start('menu');
    }
};