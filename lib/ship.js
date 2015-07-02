(function () {
  if (typeof window.Asteroids === "undefined" ) {
    window.Asteroids = {};
  }

  var Ship = window.Asteroids.Ship = function(params) {
    this.bulletAvailable = true;
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
    if ( Asteroids.Util.norm(this.vel) < 4 ) {
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
    var that = this;
    if (this.bulletAvailable) {
      var velocity = Asteroids.Util.unitVector(this.velocityVector());
      velocity.forEach(function(el, idx) {
        velocity[idx] = 11 * el;
      });
      var bullet = new Asteroids.Bullet({
        pos: this.pos,
        vel: velocity
      });
      window.Asteroids.currentGame.bullets.push(bullet);
      this.bulletAvailable = false;
      setTimeout(function() {
        that.bulletAvailable = true;
      }, 500);
    }
  };

  Ship.prototype.velocityVector = function () {
    return [Math.sin(this.rotation), -Math.cos(this.rotation)];
  };


  Ship.prototype.thrust = function () {
    var velVector = [Math.sin(this.rotation), -Math.cos(this.rotation)];
    this.power(this.velocityVector());
  };

  Ship.prototype.brake = function () {
    this.vel.forEach(function(subVel, idx) {
      this.vel[idx] = subVel * 0.97;
    }.bind(this));
  };

  Ship.prototype.rotate = function (params) {
    this.rotation += Math.PI / 64 * (params.reverse ? 1 : -1);
    if (this.rotation < 0) {
      this.rotation = 2 * Math.PI + this.rotation;
    } else if (this.rotation >= 2 * Math.PI) {
      this.rotation -= 2 * Math.PI;
    }
  };

  Ship.prototype.move = function () {
    this.decelerationCounter += 1;
    if (this.decelerationCounter > 40) {
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
