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
      this.game.draw();
    }).bind(this), 1 );
  };

  gameView.prototype.bindKeyHandlers = function () {
    var that = this;

    window.key('up', function () {
      that.game.ship.thrust();
      return false;
    });

    window.key('down', function () {
      that.game.ship.power([0, 1]);
      return false;
    });

    window.key('left', function () {
      that.game.ship.rotate({ reverse: false });
      //that.game.ship.power([-1, 0]);
      return false;
    });

    window.key('right', function () {
      that.game.ship.rotate({ reverse: true });
      //that.game.ship.power([1, 0]);
      return false;
    });
  };

})();
