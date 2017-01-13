var game = new Phaser.Game(640, 640, Phaser.CANVAS, 'gameDiv', {
    preload: this.preload,
    create: this.create,
    update: this.update,
    render: this.render,
    trap: this.trap,
    checkOverlap: this.checkOverlap

});

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('gameover', gameoverState);
game.state.add('pausemenu', pausemenuState);

game.state.start('boot');