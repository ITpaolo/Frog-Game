// Global Variables
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;




Main.prototype = {

  preload: function () {
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');
    game.load.image('floor', 'assets/images/floor.png');
    game.load.spritesheet('portalRings2', 'assets/images/portalRings2.png', 32, 32);
    game.load.spritesheet('portalRings1', 'assets/images/portalRings1.png', 32, 32);
    game.load.spritesheet('water', 'assets/images/water_animated.png', 32, 32);
    game.load.spritesheet('frog', 'assets/images/frog.png', 32, 32);
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');
    game.load.script('swipe',  'plugins/swipe.js');
    game.load.script('ScreenShake', 'plugins/ScreenShake.js');
    game.load.script('SaveCPU', 'plugins/SaveCPU.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
