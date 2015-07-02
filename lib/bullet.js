(function() {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }

  var Bullet = window.Asteroids.Bullet = function(params) {
    this.COLOR = 'red';
    this.RADIUS = 6;
    params['color'] = this.COLOR;
    params['radius'] = this.RADIUS;
    window.Asteroids.MovingObject.call(this, params);
  };

  window.Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;
})();
