(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var gameView = window.Asteroids.gameView = function (xDim, yDim, canvas){
    // probably create of game and pass x and y
    window.Asteroids.dims = [xDim, yDim];
    window.Asteroids.ctx = canvas.getContext('2d');
    this.Game = new window.Asteroids.Game(xDim, yDim);
    window.Asteroids.currentGame = this.Game;
  };

  gameView.prototype.start = function () {
    window.setInterval((function() {
      this.Game.step();
      this.Game.draw();
    }).bind(this), 10 );
  };



})();
