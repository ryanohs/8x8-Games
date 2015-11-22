var Game = function(dots, instance, fps){
  // inject self
  instance.game = this;

  var gameOver, gameWon = false;

  var draw = () => {
    setTimeout(() => {
        requestAnimationFrame(draw);
        step();
        render();
    }, 1000 / fps);
  };

  var step = () => {
    if(gameOver) return;
    instance.step();
  };

  var render = () => {
    if(gameWon) {
      renderHappyFace();
    } else if(gameOver) {
      renderSadFace();
    } else {
      instance.render();
    }
    dots.render();
  };

  var renderSadFace = () => {
    dots.clear();
    dots.set(2, 2, "red");
    dots.set(2, 5, "red");
    dots.set(4, 2, "red");
    dots.set(4, 3, "red");
    dots.set(4, 4, "red");
    dots.set(4, 5, "red");
    dots.set(5, 1, "red");
    dots.set(5, 6, "red");
  };

  var renderHappyFace = () => {
    dots.clear();
    dots.set(2, 2, "green");
    dots.set(2, 5, "green");
    dots.set(5, 2, "green");
    dots.set(5, 3, "green");
    dots.set(5, 4, "green");
    dots.set(5, 5, "green");
    dots.set(4, 1, "green");
    dots.set(4, 6, "green");
  };

  this.run = () => {
    instance.start();
    draw();
  };

  this.over = () => {
    gameOver = true;
    setTimeout(() => {
      gameOver = false;
      instance.start();
    }, 3000);
  };

  this.won = () => {
    gameWon = true;
    setTimeout(() => {
      gameOver = false;
      instance.start();
    }, 5000);
  };

  if(instance.keydown) document.addEventListener("keydown", instance.keydown);
  if(instance.keyup) document.addEventListener("keyup", instance.keyup);
};
