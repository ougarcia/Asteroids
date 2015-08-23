import Bullet from './bullet';
import Asteroid from './asteroid';
import Ship from './ship';
// temporarily not adding asteroids and ships

class Game {
  constructor(xDim, yDim) {
    this.ctx = window.Asteroids.ctx;
    this.NUM_ASTEROIDS = 3;
    this.lives = 3;
    this.DIM_X = xDim;
    this.DIM_Y = yDim;
    this.asteroids = [];
    this.bullets = [];
    for(var i = 0; i < this.NUM_ASTEROIDS; i++) {
      this.addAsteroids();
    }
    this.addShip();
  }
  randomPosition() {
    var x = Math.floor(Math.random() * this.DIM_X);
    var y = Math.floor(Math.random() * this.DIM_Y);
    return [x, y];
  }
  addAsteroids() {
    var position1 = this.randomPosition();
    // TODO: why do i need position 2 and 3 here?
    var position2 = this.randomPosition();
    var position3 = this.randomPosition();
    this.asteroids.push(Asteroid.newBigAsteroid({"pos": position1}));
  }
  addShip() {
    var position = this.randomPosition();
    this.ship = new Ship({ "pos": position });
  }
  allObjects() {
    var allObjectsArray = this.asteroids.slice(0);
    this.ship && allObjectsArray.unshift(this.ship);
    allObjectsArray = allObjectsArray.concat(this.bullets);
    return allObjectsArray;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.drawLives();
    this.allObjects().forEach(function(object) {
      object.draw(this.ctx);
    }.bind(this));
  }
  drawLives() {
    this.ctx.fillStyle = "Black";
    this.ctx.font = "48px serif";
    this.ctx.fillText(this.lives + " lives", 0, 50);
  }
  moveObjects() {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  }
  wrap(pos, object) {
  //TODO remove object from dom and instance variables if it's outside the DOM
    if (object.isWrappable) {
      for(var i = 0; i < 2; i++) {
        if (pos[i] > window.Asteroids.dims[i]) {
          pos[i] = pos[i] % window.Asteroids.dims[i];
        } else if (pos[i] < 0) {
          pos[i] = window.Asteroids.dims[i] - pos[i];
        }
      }
    }
    return pos;
  }
  checkCollisions() {
    var that = this;
    this.bullets.forEach(function(bullet) {
      that.asteroids.forEach(function(asteroid) {
        if (bullet.isCollidedWith(asteroid)) {
          that.removeBullet(bullet);
          that.removeAsteroid(asteroid);
        }
      });
    });
    this.asteroids.forEach(function(asteroid) {
      if (!!that.ship && that.ship.isCollidedWith(asteroid)) {
        that.resetShip();
      }
    });
  }
  step() {
    this.moveObjects();
    this.checkCollisions();
  }
  removeAsteroid(asteroid) {
      var asteroidIndex = this.asteroids.indexOf(asteroid);
      this.asteroids.splice(asteroidIndex, 1);
      this.asteroids = this.asteroids.concat(asteroid.spawnChildren());
  }
  removeBullet(bullet) {
    var bulletIndex = this.bullets.indexOf(bullet);
    this.bullets.splice(bulletIndex, 1);
  }
  resetShip() {
    delete this.ship;
    this.lives--;
    this.lives && setTimeout(this.addShip.bind(this), 1000);
  }
}

export default Game;
