(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }

  var Ship = window.Asteroids.Ship = function(params) {
    this.COLOR = 'red';
    this.RADIUS = 10;
    params['color'] = this.COLOR;
    params['radius'] = this.RADIUS;
    params['vel'] = [0, 0];
    window.Asteroids.MovingObject.call(this, params);
  };

  window.Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
})();
