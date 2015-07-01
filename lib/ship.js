(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }

  var Ship = window.Asteroids.Ship = function(params) {
    this.rotation = 0;
    this.decelerationCounter = 0;
    this.COLOR = 'red';
    this.RADIUS = 10;
    params['color'] = this.COLOR;
    params['radius'] = this.RADIUS;
    params['vel'] = [0, 0];
    window.Asteroids.MovingObject.call(this, params);
  };
  
  window.Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    if ( Asteroids.Util.norm(this.vel) < 10 ) {
      this.vel.forEach(function(subVel, idx) {
        this.vel[idx] +=  impulse[idx];
      }.bind(this));
    }
  };

  Ship.prototype.draw = function () {
    var ctx = window.Asteroids.ctx;
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, 40);
    ctx.lineTo(10, 40);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  Ship.prototype.fireBullet = function () {
    var velocity = Asteroids.Util.unitVector([Math.sin(this.rotation), -Math.cos(this.rotation)]);
    velocity.forEach(function(el, idx) {
      velocity[idx] = 11 * el;
    });
    var bullet = new Asteroids.Bullet({
      pos: this.pos,
      vel: velocity
    });
    window.Asteroids.currentGame.bullets.push(bullet);
  };


  Ship.prototype.thrust = function () {
    var velVector = [Math.sin(this.rotation), -Math.cos(this.rotation)];
    this.power(velVector);
  };

  Ship.prototype.brake = function () {
    var velVector = [-Math.sin(this.rotation), Math.cos(this.rotation)];
    this.power(velVector);
  };

  Ship.prototype.rotate = function (params) {
    this.rotation += Math.PI / 16 * (params.reverse ? 1 : -1);
    if (this.rotation < 0) {
      this.rotation = 2 * Math.PI + this.rotation;
    } else if (this.rotation >= 2 * Math.PI) {
      this.rotation -= 2 * Math.PI;
    }
  };

  Ship.prototype.move = function () {
    this.decelerationCounter += 1;
    if (this.decelerationCounter > 70) {
      this.decelerationCounter = 0;
      this.decelerate();
    }
    Asteroids.MovingObject.prototype.move.call(this);
  };

  Ship.prototype.decelerate = function () {
    this.vel.forEach(function(subVel, idx) {
      this.vel[idx] = subVel * 0.9;
    }.bind(this));
  };
})();
