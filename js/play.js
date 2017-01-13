var playState = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.swipe = new Swipe(this.game);

        this.game.stage.backgroundColor = "#4488AA";

        map = this.game.add.tilemap('map');
        map.addTilesetImage('floor', 'water', 'frog');
        map.setCollisionBetween(1, 99);
        this.game.physics.enable(map, Phaser.Physics.ARCADE);

        layer = map.createLayer('level1');
        layer.resizeWorld();
        layer.wrap = true;

        Floor = this.game.add.group();
        Floor.enableBody = true;
        this.game.physics.enable(Floor, Phaser.Physics.ARCADE);


        Frog = this.game.add.group();
        Frog.enableBody = true;
        this.game.physics.enable(Frog, Phaser.Physics.ARCADE);

        map.createFromObjects('obj1', 2, 'floor', 0, true, false, Floor);

        console.log('Anzahl Boden: ' + Floor.length);

        sprite = this.game.add.sprite(300, 930, 'frog');
        sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(sprite);

        Frog.callAll('animations.add', 'animations', 'frog', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
        Frog.callAll('animations.play', 'animations', 'frog');

        water = this.game.add.tileSprite(0, 150, 750, 850, 'water');
        water.animations.add('waves0', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        var n = 0;
        water.animations.play('waves' + n, 8, true);

        this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        this.game.world.bringToTop(Floor);
        this.game.world.bringToTop(sprite);

        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '60px Arial', fill: '#ff0000' });
        stateText.anchor.setTo(0.9, 1.7);
        stateText.visible = false;
        stateText.fixedToCamera = true;

    },

    trap: function (sprite, Floor) {
        var tween = game.add.tween(Floor).to( { kill: true }, 1500, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {   Floor.destroy();  });
    },

    checkOverlap: function (sprite, Floor) {
        var boundsA = sprite.getBounds();
        var boundsB = Floor.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    update: function () {
        this.game.physics.arcade.overlap(Floor, sprite, this.trap);

        var direction = this.swipe.check();
        if (direction!==null) {
            // case this.swipe.DIRECTION_UP: sprite.y -= 50; break;
            switch(direction.direction) {

                case this.swipe.DIRECTION_UP:
                    sprite.y -= 57;
                    break;
                case this.swipe.DIRECTION_LEFT:
                    sprite.x -= 50;
                    break;
                case this.swipe.DIRECTION_RIGHT:
                    sprite.x += 50;
                    break;
                case this.swipe.DIRECTION_DOWN:
                    sprite.y += 57;
                    break;
                case this.swipe.DIRECTION_UP_LEFT:
                    sprite.y -= 50;
                    sprite.x -= 50;
                    break;
                case this.swipe.DIRECTION_UP_RIGHT:
                    sprite.y -= 50;
                    sprite.x += 50;
                    break;
                case this.swipe.DIRECTION_DOWN_LEFT:
                    sprite.y += 50;
                    sprite.x -= 50;
                    break;
                case this.swipe.DIRECTION_DOWN_RIGHT:
                    sprite.y += 50;
                    sprite.x += 50;
                    break;
            }
        }

        if (this.checkOverlap(sprite, Floor))
        {
            //
        }
        else
        {
            sprite.kill();
            stateText.text=" GAME OVER \n Click to restart";
            stateText.visible = true;

            game.input.onTap.addOnce(function() {
            game.state.restart();}, this);
        }


    }

};