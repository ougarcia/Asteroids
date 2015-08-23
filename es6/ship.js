import Util from './util';
import MovingObject from './movingObject';
import Bullet from './bullet';

class Ship extends MovingObject {
  constructor(params) {
    params['color'] = 'red';
    params['radius'] = 10;
    params['vel'] = [0, 0];
    super(params);
    this.bulletAvailable = true;
    this.rotation = 0;
    this.decelerationCounter = 0;
    // FIXME: these upper case instance variables may be redundant and redundant
    this.COLOR = params.color;
    this.RADIUS = params.radius;
  }
  power(impulse) {
    if ( Util.norm(this.vel) < 4 ) {
      this.vel.forEach(function(subVel, idx) {
        this.vel[idx] +=  impulse[idx] * 0.1;
      }.bind(this));
    }
  }
  draw() {
    var ctx = window.Asteroids.ctx;
    var x = this.pos[0];
    var y = this.pos[1];
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(-10, 20);
    ctx.lineTo(10, 20);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  fireBullet() {
    var that = this;
    var velocity = Util.unitVector(this.velocityVector());
    velocity[0] *= 11;
    velocity[1] *= 11;
    var bullet = new Bullet({ pos: this.pos, vel: velocity });
    window.Asteroids.currentGame.bullets.push(bullet);
    this.bulletAvailable = false;
    setTimeout(function() {
      that.bulletAvailable = true;
    }, 500);
  }
  velocityVector() {
    return [Math.sin(this.rotation), -Math.cos(this.rotation)];
  }
  thrust() {
    var velVector = [Math.sin(this.rotation), -Math.cos(this.rotation)];
    this.power(this.velocityVector());
  }
  brake() {
    this.vel.forEach(function(subVel, idx) {
      this.vel[idx] = subVel * 0.97;
    }.bind(this));
  }
  rotate(params) {
    this.rotation += Math.PI / 48 * (params.reverse ? 1 : -1);
    if (this.rotation < 0) {
      this.rotation = 2 * Math.PI + this.rotation;
    } else if (this.rotation >= 2 * Math.PI) {
      this.rotation -= 2 * Math.PI;
    }
  }
  move() {
    this.decelerationCounter += 1;
    if (this.decelerationCounter > 40) {
      this.decelerationCounter = 0;
      this.decelerate();
    }
    super.move();
  }
  decelerate() {
    this.vel.forEach(function(subVel, idx) {
      this.vel[idx] = subVel * 0.9;
    }.bind(this));
  }
}
export default Ship;
