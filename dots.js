// x = row
// y = column
var Dots = function(scene, x, y)
{
  var dots;

  this.get = (x, y) => {
    return dots[y][x];
  };

  this.set = (x, y, value) => {
    dots[y][x] = value;
  };

  this.clear = () => {
    this.all(null);
  };

  this.all = (value) => {
    for(var i = 0; i < x; i++)
    for(var j = 0; j < y; j++)
    {
      this.set(i, j, value);
    }
  };

  this.render = () => {
    var r = WIDTH/(2*x);
    scene.fillStyle = BACK;
    scene.fillRect(0,0,WIDTH,HEIGHT);
    for(var i = 0; i < x; i++)
    for(var j = 0; j < y; j++)
    {
      scene.fillStyle = this.get(i, j) || OFF;
      scene.beginPath();
      scene.arc((2*j + 1)*r, (2*i + 1)*r, 0.9*r, 0, 2*Math.PI, false);
      scene.fill();
      scene.closePath();
    }
  };

  // init
  dots = new Array(x);;
  for(var i = 0; i < x; i++)
  {
    dots[i] = new Array(y);
  }
  this.clear();
};
