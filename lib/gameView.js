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
    var pressedKeys =window.key.getPressedKeyCodes();
    if (window.key.isPressed('up')) {
      this.game.ship.thrust();
    }

    if (window.key.isPressed('down')) {
      this.game.ship.brake();
    }


    if (window.key.isPressed('space')) {
      this.game.ship.fireBullet();
    }


    if (window.key.isPressed('left')) {
      this.game.ship.rotate({ reverse: false });
    }


    if (window.key.isPressed('right')) {
      this.game.ship.rotate({ reverse: true });
    }


  };

})();
