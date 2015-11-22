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

var Snake = function(dots) {
  this.game; // injected

  var Dir = {UP:0, RIGHT:1, DOWN:2, LEFT:3};
  var body, target, heading;

  this.next = () => {
    while(true) {
      target = {x: random(0, X-1), y: random(0, Y-1)};
      if(!body.slice(0, body.length - 1).some(o => o.x == target.x && o.y == target.y)) break;
    }
  };

  this.keydown = e => {
    switch(e.keyCode)
    {
      case 37:
        this.left();
        break;
      case 38:
        this.up();
        break;
      case 39:
        this.right();
        break;
      case 40:
        this.down();
        break;
    }
  };

  this.up = () => { heading = Dir.UP; };
  this.right = () => { heading = Dir.RIGHT; };
  this.down = () => { heading = Dir.DOWN; };
  this.left = () => { heading = Dir.LEFT; };

  this.step = () => {
    var head = body[0];
    var next;
    switch(heading) {
      case Dir.UP:
        next = {x: head.x - 1, y: head.y};
        break;
      case Dir.DOWN:
        next = {x: head.x + 1, y: head.y};
        break;
      case Dir.LEFT:
        next = {x: head.x, y: head.y - 1};
        break;
      case Dir.RIGHT:
        next = {x: head.x, y: head.y + 1};
        break;
    }
    if(next.x == -1 || next.x == X || next.y == -1 || next.y == Y
      || body.slice(0, body.length - 1).some(o => o.x == next.x && o.y == next.y))
    {
      this.game.over();
      return;
    }
    var hitTarget = (next.x == target.x && next.y == target.y);
    body.splice(0, 0, next);
    if(hitTarget) {
      this.next();
    } else {
      body.length--;
    }
  };

  this.render = () => {
    dots.clear();
    dots.set(target.x, target.y, "green");
    body.forEach(d => dots.set(d.x, d.y, "red"));
  };

  this.start = () => {
    body = [{x: X/2, y: Y/2}, {x: X/2 + 1, y: Y/2}, {x: X/2 + 2, y: Y/2}];
    target = {};
    heading = Dir.UP;
    this.next();
  };
};

var dots = new Dots(scene, X, Y);
var snake = new Snake(dots);
var game = new Game(dots, snake, 4);

game.run();
