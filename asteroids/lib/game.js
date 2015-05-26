(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = window.Asteroids.Game = function (xDim, yDim) {
    this.ctx = window.Asteroids.ctx;
    this.NUM_ASTEROIDS = 8;
    this.DIM_X = xDim;
    this.DIM_Y = yDim;
    this.asteroids = [];
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.addAsteroids();
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * this.DIM_X);
    var y = Math.floor(Math.random() * this.DIM_Y);
    return [x, y];
  };

  Game.prototype.addAsteroids = function() {
    var position = this.randomPosition();
    this.asteroids.push(new window.Asteroids.Asteroid({"pos": position}));
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(this.ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.wrap = function(pos) {
    for(var i = 0; i < 2; i++) {
      if (pos[i] > window.Asteroids.dims[i]) {
        pos[i] = pos[i] % window.Asteroids.dims[i];
      } else if (pos[i] < 0) {
        pos[i] = window.Asteroids.dims[i] - pos[i];
      }
    }
    return pos;
  };

  Game.prototype.checkCollisions = function () {
    var asteroidsLength = this.asteroids.length;
    for(var i = 0; i < asteroidsLength-1; i++) {
      for(var j = i+1; j < asteroidsLength; j++) {
        if (this.asteroids[i].isCollidedWith(this.asteroids[j])) {
          this.asteroids[i].collideWith(this.asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.removeIt = function (asteroid) {
      var asteroidIndex = this.asteroids.indexOf(asteroid);
      this.asteroids.splice(asteroidIndex, 1);
  };


})();
