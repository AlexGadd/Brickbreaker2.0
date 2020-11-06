//Canvas
var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
  });

//Variables
var ball;



//Functions
function preload() {
  //Canvas preloads
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#FFFFFF';
  game.load.image('ball', 'img/ball.png');
    

}
function create() {
  ball = game.add.sprite(50,50,'ball');
}
function update() {
  ball.x +=1
  ball.y +=1
}