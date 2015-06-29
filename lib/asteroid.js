(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = window.Asteroids.Asteroid = function (params) {
    this.COLOR = 'blue';
    this.RADIUS = 20;
    params['color'] = this.COLOR;
    params['radius'] = this.RADIUS;
    params['vel'] = window.Asteroids.Util.randomVec(1);
    window.Asteroids.MovingObject.apply(this, [params]);
  };

  window.Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
