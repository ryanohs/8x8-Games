var X = 8;
var Y = 8;
var WIDTH = X * 60;
var HEIGHT = Y * 60;
var BACK = "#000";
var OFF = "#333";
var ALT_FRAME_COUNT = 2;

var canvas = document.getElementById("dots");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var scene = canvas.getContext("2d");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Ball = function(x, y, vx, vy) {
  this.x = x;
  this.y = y;
  this.vx = vx; // vertical
  this.vy = vy; // horizontal

  this.hitPaddle = force => {
    this.vx = -1;
    this.vy = force;
  }

  this.hitBlock = () => {
    this.vx = -this.vx;
    //this.vy = -this.vy;
  }

  this.bounceOffBoundaries = () => {
    if(this.y == 0 || this.y == Y - 1) {
      this.vy = -this.vy;
    }
    if(this.x == 0) {
      this.vx = 1;
    }
  }

  this.step = () => {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
  }
}

var Breakout = function(dots) {
  this.game; // injected

  var Dir = {NONE: 0, LEFT:1, RIGHT:2};
  var blocks, paddle, ball, heading, bumped;
  var frames = ALT_FRAME_COUNT;

  this.keydown = e => {
    switch(e.keyCode)
    {
      case 32:
        bumped = true;
        break;
      case 37:
        heading = Dir.LEFT;
        break;
      case 39:
        heading = Dir.RIGHT;
        break;
    }
  };

  this.keyup = e => {
    switch(e.keyCode)
    {
      case 32:
        bumped = false;
        break;
      case 37:
      case 39:
        heading = Dir.None;
        break;
    }
  };

  this.step = () => {
    switch(heading) {
      case Dir.LEFT:
        if(paddle > 0) paddle--;
        break;
      case Dir.RIGHT:
        if(paddle + 3 < X) paddle++;
        break;
    }
    // allows user to move paddle faster than ball.
    if(frames != 0) {
      frames--;
      return;
    }
    frames = ALT_FRAME_COUNT;
    if(blocks[ball.y][ball.x])
    {
      ball.hitBlock();
      blocks[ball.y][ball.x] = false;
    } else if((bumped && ball.x == 5) || (!bumped && ball.x == 6)) {
      if(ball.y == paddle - 1 && ball.vy > 0) {
        ball.hitPaddle(-1);
      } else if(ball.y == paddle && ball.vy != 0) {
        ball.hitPaddle(0);
      } else if(ball.y == paddle) {
        ball.hitPaddle(-1);
      } else if(ball.y == paddle + 1 && ball.vy != 0) {
        ball.hitPaddle(ball.vy);
      } else if(ball.y == paddle + 1) {
        ball.hitPaddle(0);
      } else if(ball.y == paddle + 2 && ball.vy != 0) {
        ball.hitPaddle(0);
      } else if(ball.y == paddle + 2) {
        ball.hitPaddle(1);
      } else if(ball.y == paddle + 3 && ball.vy < 0) {
        ball.hitPaddle(1);
      }
    } else if(ball.x == 6) {
      if(ball.y == paddle && ball.vy != 0) {
        ball.hitPaddle(0);
      } else if(ball.y == paddle) {
        ball.hitPaddle(-1);
      } else if(ball.y == paddle + 1 && ball.vy != 0) {
        ball.hitPaddle(ball.vy);
      } else if(ball.y == paddle + 1) {
        ball.hitPaddle(0);
      } else if(ball.y == paddle + 2 && ball.vy != 0) {
        ball.hitPaddle(0);
      } else if(ball.y == paddle + 2) {
        ball.hitPaddle(1);
      }
    }
    ball.bounceOffBoundaries();
    if(ball.x > 6) {
      this.game.over();
      return;
    }
    if(blocks.every(r => r.every(y => !y))) {
      this.game.won();
      return;
    }
    ball.step();
  };

  this.render = () => {
    dots.clear();
    var paddleRow = bumped ? 6 : 7;
    dots.set(paddleRow, paddle, "red");
    dots.set(paddleRow, paddle + 1, "red");
    dots.set(paddleRow, paddle + 2, "red");
    for(var i = 0; i < 3; i++)
    for(var j = 0; j < Y; j++)
    {
      if(blocks[j][i]) {
        dots.set(i, j, "red");
      }
    }
    dots.set(ball.x, ball.y, "green");
  };

  this.start = () => {
    paddle = 3;
    ball = new Ball(6, 3, -1, 0);
    blocks = new Array(X);
    for(var i = 0; i < X; i++)
    {
      blocks[i] = new Array(Y);
    }
    heading = Dir.NONE;
    for(var i = 0; i < 3; i++)
    for(var j = 0; j < Y; j++)
    {
      blocks[j][i] = true;
    }
  };
};

var dots = new Dots(scene, X, Y);
var breakout = new Breakout(dots);
var game = new Game(dots, breakout, 20);

game.run();
