(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function (params) {
    this.COLOR = 'blue';
    this.RADIUS = params.radius || 40;
    params['color'] = this.COLOR;
    params['radius'] = this.RADIUS;
    params['vel'] = window.Asteroids.Util.randomVec(
      Math.floor(Math.random() * 3 + 2)
    );
    window.Asteroids.MovingObject.call(this, params);
  };

  window.Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroids.Asteroid.newBigAsteroid = function(params) {
    params.radius = 60;
    return new Asteroids.Asteroid(params);
  };

  Asteroids.Asteroid.newMediumAsteroid = function(params) {
    params.radius = 40;
    return new Asteroids.Asteroid(params);
  };


  Asteroids.Asteroid.newSmallAsteroid = function(params) {
    params.radius = 20;
    return new Asteroids.Asteroid(params);
  };

})();
