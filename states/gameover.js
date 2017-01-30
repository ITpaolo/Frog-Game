var GameOver = function (game) {
};

GameOver.prototype = {

    preload: function () {
        this.optionCount = 1;
    },

    addMenuOption: function (text, callback) {
        var optionStyle = {font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
        var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 300, text, optionStyle);
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
        var gameover = game.add.sprite(0, 0, 'gameover-bg');
        gameover.scale.setTo(0.5);
        var titleStyle = {align: 'center', font: 'bold 60pt TheMinion', fill: '#FDFFB5'};
        var scoreStyle = {align: 'center', font: 'italic 40pt arial', fill: '#FF0000'};
        var highscoreStyle = {align: 'center', font: 'bold 40pt bebas', fill: '#DF7401'};
        var text = game.add.text(game.world.centerX, 100, "Game Over", titleStyle);
        var highscoreText = game.add.text(game.world.centerX, 200, "Your Highscore:" + localStorage.getItem('highscore'), highscoreStyle);
        var scoreText = game.add.text(game.world.centerX, 270, "Your Score:" + score, scoreStyle);
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        text.anchor.set(0.5);
        scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        scoreText.anchor.set(0.5);
        highscoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        highscoreText.anchor.set(0.5);
        this.addMenuOption('Play Again', function (e) {
            this.game.state.start("Game");
        });
        this.addMenuOption('Main Menu', function (e) {
            this.game.state.start("GameMenu");
        });


        if(localStorage.getItem('highscore') === null){
            localStorage.setItem('highscore',score);
        }
        else if(score > localStorage.getItem('highscore')){
            localStorage.setItem('highscore',score);
        }

        console.log(localStorage);

        console.log('HS: ' + localStorage.getItem('highscore'));
        console.log('Your score is: ' + score);

        score = 0;
    }
};