var X = 8;
var Y = 8;
var WIDTH = X * 60;
var HEIGHT = Y * 60;
var BACK = "#000";
var OFF = "#333";

var canvas = document.getElementById("dots");
canvas.width = WIDTH;
canvas.height = HEIGHT;
var scene = canvas.getContext("2d");

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Tunnel = function(dots) {
  this.game; // injected

  var Dir = {NONE: 0, LEFT:1, RIGHT:2};
  var rows, position, heading;

  var shift = top => {
    if(top == 0) {
      return top + random(0, 1);
    } else if(top == X - 3) {
      return top + random(-1, 0);
    } else {
      return top + random(-1, 1);
    }
  };

  var next = () => {
    var top = rows[0];
    top = shift(top);
    rows.splice(0, 0, top);
    rows.length--;
  };

  this.keydown = e => {
    switch(e.keyCode)
    {
      case 37:
        this.left();
        break;
      case 39:
        this.right();
        break;
    }
  };

  this.right = () => { heading = Dir.RIGHT; };
  this.left = () => { heading = Dir.LEFT; };

  this.step = () => {
    switch(heading) {
      case Dir.LEFT:
        position--;
        break;
      case Dir.RIGHT:
        position++;
        break;
    }
    next();
    var offset = rows[4];
    if(position < offset || position > offset + 2) {
      this.game.over();
      return;
    }
    heading = Dir.NONE;
  };

  this.render = () => {
    dots.clear();
    dots.set(4, position, "green");
    rows.forEach((offset, x) => {
      for(var y = 0; y < Y; y++)
      {
        if(y < offset || y > offset + 2) {
          dots.set(x, y, "red");
        }
      }
    });
  };

  this.start = () => {
    rows = new Array(X);
    heading = Dir.NONE;
    var offset = random(0, X-3);
    for(var i = 0; i < X; i++)
    {
      offset = shift(offset);
      rows[i] = offset;
    }
    position = rows[4] + 1;
  };
};

var dots = new Dots(scene, X, Y);
var tunnel = new Tunnel(dots);
var game = new Game(dots, tunnel, 4);

game.run();
