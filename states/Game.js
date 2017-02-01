var Game = function(game) {};

Game.prototype = {

    preload: function () {
        this.optionCount = 1;
    },

    addMenuOption: function (text, callback) {
        var optionStyle = {font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "rgba(0,0,0,0";
        txt.strokeThickness = 4;
        var onOver = function (target) {
            target.fill = "#FEFFD5";
            target.stroke = "rgba(200,200,200,0.5)";
            txt.useHandCursor = true;
        };
        var onOut = function (target) {
            target.fill = "white";
            target.stroke = "rgba(0,0,0,0)";
            txt.useHandCursor = false;
        };
        //txt.useHandCursor = true;
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);

        this.optionCount++;
    },

    create: function () {

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.swipe = new Swipe(this.game);

        this.game.stage.backgroundColor = "#4488AA";

        map = this.game.add.tilemap('map');
        map.addTilesetImage('water');
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

        portalRings2 = this.game.add.group();
        portalRings2.enableBody = true;
        this.game.physics.enable(portalRings2, Phaser.Physics.ARCADE);

        map.createFromObjects('obj1', 1, 'floor', 0, true, false, Floor);
        map.createFromObjects('obj1', 18, 'portalRings2', 0, true, false, portalRings2);

        console.log('Anzahl Boden: ' + Floor.length);

        sprite = this.game.add.sprite(300, 930, 'frog');
        sprite.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(sprite);

        water = this.game.add.tileSprite(0, 150, 750, 850, 'water');
        water.animations.add('waves0', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        portalRings2.callAll('animations.add', 'animations', 'portalRings2', [0, 1, 2, 3, 4], 10, true);
        portalRings2.callAll('animations.play', 'animations', 'portalRings2');

        var w = 0;
        water.animations.play('waves' + w, 8, true);

        this.game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

        cursors = game.input.keyboard.createCursorKeys();

        this.game.world.bringToTop(Floor);
        this.game.world.bringToTop(portalRings2);
        this.game.world.bringToTop(sprite);

        game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
        game.plugins.saveCPU = game.plugins.add(Phaser.Plugin.SaveCPU);
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

    checkOverlap2: function (sprite, portalRings2) {
        var boundsC = sprite.getBounds();
        var boundsD = portalRings2.getBounds();

        return Phaser.Rectangle.intersects(boundsC, boundsD);
    },

    update: function () {
        this.game.physics.arcade.overlap(Floor, sprite, this.trap);
        this.game.physics.arcade.overlap(portalRings2, sprite);

        var direction = this.swipe.check();
        if (direction !== null) {
            // case this.swipe.DIRECTION_UP: sprite.y -= 50; break;
            switch (direction.direction) {

                case this.swipe.DIRECTION_UP:
                    sprite.y -= 57;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_LEFT:
                    sprite.x -= 50;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_RIGHT:
                    sprite.x += 50;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_DOWN:
                    sprite.y += 57;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_UP_LEFT:
                    sprite.y -= 50;
                    sprite.x -= 50;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_UP_RIGHT:
                    sprite.y -= 50;
                    sprite.x += 50;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_DOWN_LEFT:
                    sprite.y += 50;
                    sprite.x -= 50;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
                case this.swipe.DIRECTION_DOWN_RIGHT:
                    sprite.y += 50;
                    sprite.x += 50;
                    score++;
                    game.plugins.screenShake.shake(30);
                    break;
            }
        }

        if (this.checkOverlap(sprite, Floor)) {
            //
        }
        else {
            this.game.state.start("GameOver");
        }

        if (this.checkOverlap2(sprite, portalRings2)) {
            this.game.state.start("Game2");
        }
        else {
            //
        }

        console.log(score);
    },

    render: function () {
        game.time.advancedTiming = true;
        game.debug.text(game.time.fps, 10, 15, "#00ff00");
    }

};