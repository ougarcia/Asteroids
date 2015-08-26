import Util from './util';
import MovingObject from './movingObject';

class Asteroid extends MovingObject {
  constructor(params) {
    params.color = '#7A7371';
    params.radius = params.radius || 40;
    params.vel = Util.randomVec(Math.floor(Math.random() * 3 + 1));
    super(params);
  }
  spawnChildren() {
    if (this.radius <= 20) return [];
    const params = { pos: this.pos, radius: this.radius - 20 };
    //const newAsteroids = [0, 0].map(() => new Asteroid(params));
    let newAsteroids = [];
    // this is dumb but javascript [] === [] is stupid
    let vels = [];
    while (newAsteroids.length < 2) {
      const can = new Asteroid(params);
      if (vels.filter(vel => Util.areSameVectors(vel, can.vel)).length === 0) {
        newAsteroids.push(can);
      }
    }
    return newAsteroids;
  }
  draw() {
    const ctx = window.Asteroids.ctx;
    ctx.beginPath();
    const img = new Image();
    img.src = "asteroid.png";
    const x = this.pos[0] - this.radius;
    const y = this.pos[1] - this.radius;
    ctx.drawImage(img, x, y, this.radius*2, this.radius*2);
  }
  static newBigAsteroid(params) {
    params.radius = 60;
    return new Asteroid(params);
  }
  static newMediumAsteroid(params) {
    params.radius = 40;
    return new Asteroid(params);
  }
  static newSmallAsteroid(params) {
    params.radius = 20;
    return new Asteroid(params);
  }
}

export default Asteroid;
