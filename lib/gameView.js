(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var gameView = window.Asteroids.gameView = function (xDim, yDim, canvas){
    window.Asteroids.dims = [xDim, yDim];
    window.Asteroids.ctx = canvas.getContext('2d');
    this.game = new window.Asteroids.Game(xDim, yDim);
    window.Asteroids.currentGame = this.game;
  };

  gameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval((function() {
      this.game.step();
      this.checkKeys();
      this.game.draw();
    }).bind(this), 10 );
  };

  gameView.prototype.bindKeyHandlers = function () {
    window.key('up, down, space, left, right', function () {
      return false;
    });
  };

  gameView.prototype.checkKeys = function () {
    var ship = this.game.ship;
    window.key.isPressed('up') && ship.thrust();
    window.key.isPressed('down') && ship.brake();
    window.key.isPressed('space') && ship.bulletAvailable && ship.fireBullet();
    window.key.isPressed('left') && ship.rotate({ reverse: false });
    window.key.isPressed('right') && ship.rotate({ reverse: true });
  };

})();
