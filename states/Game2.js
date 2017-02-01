var Game2 = function(game) {};

Game2.prototype = {

    create: function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.swipe = new Swipe(this.game);

        this.game.stage.backgroundColor = "#4488AA";

        map = this.game.add.tilemap('map2');
        map.addTilesetImage('water');
        map.setCollisionBetween(1, 99);
        this.game.physics.enable(map, Phaser.Physics.ARCADE);


        layer = map.createLayer('level2');
        layer.resizeWorld();
        layer.wrap = true;

        Floor = this.game.add.group();
        Floor.enableBody = true;
        this.game.physics.enable(Floor, Phaser.Physics.ARCADE);

        Frog = this.game.add.group();
        Frog.enableBody = true;
        this.game.physics.enable(Frog, Phaser.Physics.ARCADE);

        portalRings1 = this.game.add.group();
        portalRings1.enableBody = true;
        this.game.physics.enable(portalRings1, Phaser.Physics.ARCADE);

        map.createFromObjects('obj2', 1, 'floor', 0, true, false, Floor);
        map.createFromObjects('obj2', 18, 'portalRings1', 0, true, false, portalRings1);

        console.log('Anzahl Boden: ' + Floor.length);

        sprite = this.game.add.sprite(305, 865, 'frog');
        sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(sprite);

        portalRings1.callAll('animations.add', 'animations', 'portalRings1', [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 10, true);
        portalRings1.callAll('animations.play', 'animations', 'portalRings1');

        water = this.game.add.tileSprite(0, 150, 750, 850, 'water');
        water.animations.add('waves0', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        var w = 0;
        water.animations.play('waves' + w, 8, true);

        this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        this.game.world.bringToTop(Floor);
        this.game.world.bringToTop(portalRings1);
        this.game.world.bringToTop(sprite);

    },

    trap: function (sprite, Floor) {
        var tween = game.add.tween(Floor).to({kill: true}, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function () {
            Floor.destroy();
        });
    },

    checkOverlap: function (sprite, Floor) {
        var boundsA = sprite.getBounds();
        var boundsB = Floor.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);
    },

    checkOverlap2: function (sprite, portalRings1) {
        var boundsC = sprite.getBounds();
        var boundsD = portalRings1.getBounds();

        return Phaser.Rectangle.intersects(boundsC, boundsD);
    },

    update: function () {
        this.game.physics.arcade.overlap(Floor, sprite, this.trap);
        this.game.physics.arcade.overlap(portalRings1, sprite, this.checkOverlap2);

        var direction = this.swipe.check();
        if (direction !== null) {
            // case this.swipe.DIRECTION_UP: sprite.y -= 50; break;
            switch (direction.direction) {

                case this.swipe.DIRECTION_UP:
                    sprite.y -= 57;
                    score++;
                    break;
                case this.swipe.DIRECTION_LEFT:
                    sprite.x -= 50;
                    score++;
                    break;
                case this.swipe.DIRECTION_RIGHT:
                    sprite.x += 50;
                    score++;
                    break;
                case this.swipe.DIRECTION_DOWN:
                    sprite.y += 57;
                    score++;
                    break;
                case this.swipe.DIRECTION_UP_LEFT:
                    sprite.y -= 50;
                    sprite.x -= 50;
                    score++;
                    break;
                case this.swipe.DIRECTION_UP_RIGHT:
                    sprite.y -= 50;
                    sprite.x += 50;
                    score++;
                    break;
                case this.swipe.DIRECTION_DOWN_LEFT:
                    sprite.y += 50;
                    sprite.x -= 50;
                    score++;
                    break;
                case this.swipe.DIRECTION_DOWN_RIGHT:
                    sprite.y += 50;
                    sprite.x += 50;
                    score++;
                    break;
            }
        }


        console.log(score);

/*
        if (this.checkOverlap2(sprite, portalRings1)) {
            game.state.start("GameMenu")
        }
        else {
            //
        }


        if (this.checkOverlap(sprite, Floor)) {
            //
        }
         else {
         this.game.state.start("GameOver");
         }*/
    },

    render: function () {
        game.time.advancedTiming = true;
        game.debug.text(game.time.fps, 10, 15, "#00ff00");
    }

};