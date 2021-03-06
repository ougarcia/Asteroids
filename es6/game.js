import Asteroid from './asteroid';
import Ship from './ship';
import Star from './star';

class Game {
  constructor(xDim, yDim) {
    this.ctx = window.Asteroids.ctx;
    this.NUM_ASTEROIDS = 3;
    this.lives = 3;
    this.DIM_X = xDim;
    this.DIM_Y = yDim;
    this.asteroids = [];
    this.bullets = [];
    this.stars = [];
    this.addStars();
    for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.addAsteroids();
    }
    this.addShip();
  }
  randomPosition() {
    const pos = [this.DIM_X, this.DIM_Y].map(dim => {
      return Math.floor(Math.random() * dim);
    });
    return pos;
  }
  addAsteroids() {
    const position1 = this.randomPosition();
    this.asteroids.push(Asteroid.newBigAsteroid({'pos': position1}));
  }
  addShip() {
    const position = this.randomPosition();
    this.ship = new Ship({ 'pos': position });
  }
  addStars() {
    const starCount = 30;
    for (let i = 0; i < starCount; i++) {
      const pos = this.randomPosition();
      this.stars.push(new Star(pos));
    }
  }
  allObjects() {
    let allObjectsArr = [...this.stars, ...this.asteroids, ...this.bullets];
    if (this.ship) allObjectsArr.push(this.ship);
    return allObjectsArr;
  }
  backgroundFill() {
    this.ctx.fillStyle = '#283642';
    this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    this.ctx.strokeStyle = "#283642";
  }
  draw() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.backgroundFill();
    this.drawLives();
    this.allObjects().forEach( object => object.draw(this.ctx) );
  }
  drawLives() {
    let [x, y] = [5, 5];
    const img = new Image();
    img.src = "ship.svg";
    for (let i = 0; i < this.lives; i++) {
      this.ctx.beginPath();
      this.ctx.drawImage(img, x, y, 20, 40);
      this.ctx.closePath();
      x += 30;
    }
  }
  moveObjects() {
    this.allObjects().forEach( object => object.move() );
  }
  wrap(pos, object) {
    // TODO: if not wrappable then remove;
    if (!object.isWrappable) return pos;

    [0, 1].forEach( i => {
      if (pos[i] > window.Asteroids.dims[i]) {
        pos[i] = pos[i] % window.Asteroids.dims[i];
      } else if (pos[i] < 0) {
        pos[i] = window.Asteroids.dims[i] - pos[i];
      }
    });
    return pos;
  }
  checkCollisions() {
    // might want to use for of instead of forEach
    this.bullets.forEach( bullet => {
      this.asteroids.forEach( asteroid => {
        if (bullet.isCollidedWith(asteroid)) {
          this.removeBullet(bullet);
          this.removeAsteroid(asteroid);
        }
      });
    });
    this.asteroids.forEach( asteroid => {
      if (!!this.ship && this.ship.isCollidedWith(asteroid)) this.resetShip();
    });
  }
  step() {
    this.moveObjects();
    this.checkCollisions();
  }
  removeAsteroid(asteroid) {
    const asteroidIndex = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(asteroidIndex, 1);
    this.asteroids = this.asteroids.concat(asteroid.spawnChildren());
  }
  removeBullet(bullet) {
    const bulletIndex = this.bullets.indexOf(bullet);
    this.bullets.splice(bulletIndex, 1);
  }
  resetShip() {
    delete this.ship;
    this.lives--;
    this.lives && setTimeout(this.addShip.bind(this), 1000);
  }
}

export default Game;
