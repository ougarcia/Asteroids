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

  Ship.prototype.power = function(impulse) {
    //TODO: set a max velocity, and when I'm done, make sure the ship
    //naturally decelerates
    for (var i = 0; i < 2; i++) {
      this.vel[i] += impulse[i];
    }
  };
})();
