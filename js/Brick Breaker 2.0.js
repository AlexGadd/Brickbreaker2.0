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
var textStyle = { font: '18px Arial', fill: '#0095DD' };
var score = 0;
var scoreText;
var lives = 3;
var livesText;
var lifeLostText;



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
  ball.events.onOutOfBounds.add(ballLeaveScreen, this);

  //Bringing the bricks into the game
  initBricks()

  //Scoring system
  scoreText = game.add.text(10,10, 'Points: ' + score, textStyle)

  //Displaying lives
  livesText = game.add.text(game.world.width-5, 5, 'Lives: '+lives, textStyle);
  livesText.anchor.set(1,0)
  lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', textStyle)
  lifeLostText.anchor.set(0.5);
  lifeLostText.visible = false;
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
  //Kills bricks and update score
  brick.kill()
  score += 1
  scoreText.setText('Points: ' + score);

  //checks to see how many bricks are left
  var count_alive = 0;
  for (i=0; i<bricks.children.length; i++){
    if(bricks.children[i].alive == true){
      count_alive++;
    }
  }

  //once the number of bricks is  less than 1 it triggers an end game
  if (count_alive < 1){
    alert("Congratulations, you won!");
    location.reload();
  }
}

//out of bounds function
function ballLeaveScreen(){
  lives--;
  if(lives){
    livesText.setText('Lives: ' +lives);
    livesLostText.visible = true;
    ball.reset(game.world.width*0.5, game.world.height-25);
    paddle.reset(game.world.width*0.5, game.world.height-5);
    game.input.onDown.addOnce(function(){
      lifeLostText.visible = false;
      ball.body.velocity.set(150, -150);
    }, this)
  }
  else{
    alert('You lost!')
    location.reload()
  }
}