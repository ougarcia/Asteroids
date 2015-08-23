import Util from './util.js';

class MovingObject {
  constructor(params) {
    this.pos = params['pos'];
    this.vel = params['vel'];
    this.radius = params['radius'];
    this.color = params['color'];
    this.isWrappable = true;
  }
  isWrappable() {
    return true;
  }
  draw () {
    var ctx = window.Asteroids.ctx;
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
  move() {
    var newPosition = [];
    for (var i = 0; i < 2; i++) {
      newPosition[i] = this.pos[i] + this.vel[i];
    }

    this.pos = window.Asteroids.currentGame.wrap(newPosition, this);
  }
  isCollidedWith(otherObject) {
    var posDif = 0;
    for (var i = 0; i < 2; i++){
      posDif += Math.pow((this.pos[i] - otherObject.pos[i]), 2);
    }
    posDif = Math.sqrt(posDif);
    if (posDif < (this.radius + otherObject.radius)) {
      return true;
    }
    return false;
  }
  collidedWith(otherObject) {
    // this might not be necessary
    if (this instanceof Asteroids.Bullet &&
          otherObject instanceof Asteroids.Asteroid) {
      Asteroids.currentGame.removeAsteroid(otherObject);
    }
  }
}

export default MovingObject;
