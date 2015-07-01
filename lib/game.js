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
    this.bullets = [];
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.addAsteroids();
    }
    this.addShip();
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

  Game.prototype.addShip = function () {
    var position = this.randomPosition();
    this.ship = new Asteroids.Ship({ "pos": position });
  };

  Game.prototype.allObjects = function () {
    var allObjectsArray = this.asteroids.slice(0);
    allObjectsArray.unshift(this.ship);
    allObjectsArray = allObjectsArray.concat(this.bullets);
    return allObjectsArray;
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach(function(object) {
      object.draw(this.ctx);
    }.bind(this));
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
    // have a method that returns ships and bullets
  };

  Game.wrap = function(pos, object) {
    //TODO remove object from dom and instance variables if it's outsid
    //the DOM
    if (object.isWrappable) {
      for(var i = 0; i < 2; i++) {
        if (pos[i] > window.Asteroids.dims[i]) {
          pos[i] = pos[i] % window.Asteroids.dims[i];
        } else if (pos[i] < 0) {
          pos[i] = window.Asteroids.dims[i] - pos[i];
        }
      }
    }
    return pos;
  };

  Game.prototype.checkCollisions = function () {
    var that = this;
    this.bullets.forEach(function(bullet) {
      that.asteroids.forEach(function(asteroid) {
        if (bullet.isCollidedWith(asteroid)) {
          that.removeAsteroid(asteroid);
        }
      });
    });
    this.asteroids.forEach(function(asteroid) {
      if (that.ship.isCollidedWith(asteroid)) {
        that.resetShip();
      }
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.removeAsteroid = function (asteroid) {
      var asteroidIndex = this.asteroids.indexOf(asteroid);
      this.asteroids.splice(asteroidIndex, 1);
  };

  Game.prototype.resetShip = function() {
    this.addShip();
  };

})();
