//Canvas
var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
    preload: preload, create: create, update: update
  });

//Variables
var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;



//Functions
function preload() {
  //Canvas preloads
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  game.load.image('ball', 'img/ball.png');
  game.load.image('paddle','img/paddle.png');
  game.load.image('brick', 'img/brick.png');
    

};
function create() {
  //ball code
  game.physics.startSystem(Phaser.Physics.ARCADE);
  ball = game.add.sprite(game.world.width*0.5, game.world.height-25,'ball');
  ball.anchor.set(0.5)
  game.physics.enable(ball,Phaser.Physics.ARCADE);
  ball.body.velocity.set(150,-150)
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);

  //paddle code
  paddle = game.add.sprite(game.world.width*0.5, game.world.height-5,'paddle');
  paddle.anchor.set(0.5,1);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  paddle.body.immovable = true;

  //game over code
  game.physics.arcade.checkCollision.down = false;
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(function(){
    alert('Game over!')
    location.reload()
  }, this)

    //Bringing the bricks into the game
    initBricks()
};

function update() {
  game.physics.arcade.collide(ball, paddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  paddle.x = game.input.x || game.world.width*0.5;
};

//Drawing the bricks
function initBricks(){
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 7,
      col: 3
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  };
  bricks = game.add.group();
  for(c=0; c<brickInfo.count.col; c++){
    for(r=0; r<brickInfo.count.row; r++){
      var brickX = (r*(brickInfo.width + brickInfo.padding))+brickInfo.offset.left;
      var brickY = (c*(brickInfo.height + brickInfo.padding))+brickInfo.offset.top;
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true
      newBrick.anchor.set(0.5)
      bricks.add(newBrick)

    }

  }
};

//Brick collisions
function ballHitBrick(ball, brick){
  brick.kill()
}