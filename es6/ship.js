import Util from './util';
import MovingObject from './movingObject';
import Bullet from './bullet';

class Ship extends MovingObject {
  constructor(params) {
    params.color = 'red';
    params.radius = 20;
    params.vel = [0, 0];
    super(params);
    this.bulletAvailable = true;
    this.rotation = 0;
    this.decelerationCounter = 0;
  }
  power(impulse) {
    if ( Util.norm(this.vel) < 4 ) {
      this.vel = this.vel.map( (subVel, idx) => subVel + impulse[idx] * 0.1 );
    }
  }
  draw() {
    const ctx = window.Asteroids.ctx;
    const [x, y] = this.pos;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    const img = new Image();
    img.src = "ship.svg";
    ctx.drawImage(
      img,
      -this.radius,
      -this.radius * 2,
      this.radius * 2,
      this.radius * 4
    );
    //ctx.moveTo(0, -20);
    //ctx.lineTo(-10, 20);
    //ctx.lineTo(10, 20);
    //ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  fireBullet() {
    const velocity = Util.unitVector(this.velocityVector()).map(subVel => {
      return subVel * 11;
    });
    const bullet = new Bullet({ pos: this.pos, vel: velocity });
    window.Asteroids.currentGame.bullets.push(bullet);
    this.bulletAvailable = false;
    setTimeout(() => this.bulletAvailable = true,  500);
  }
  velocityVector() {
    // vector w/ magnitude 1 that points in the direction the ship is going
    return [Math.sin(this.rotation), -Math.cos(this.rotation)];
  }
  thrust() {
    this.power(this.velocityVector());
  }
  brake() {
    this.vel = this.vel.map(subVel => subVel * 0.97);
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
    this.vel = this.vel.map(subVel => subVel * 0.9);
  }
}
export default Ship;
