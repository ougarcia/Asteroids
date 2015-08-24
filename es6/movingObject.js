class MovingObject {
  constructor({pos, vel, radius, color}) {
    [this.pos, this.vel, this.radius, this.color] = [pos, vel, radius, color];
    this.isWrappable = true;
  }
  draw() {
    const ctx = window.Asteroids.ctx;
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
    const newPosition = this.pos.map((pos, i) => pos + this.vel[i]);
    this.pos = window.Asteroids.currentGame.wrap(newPosition, this);
  }
  isCollidedWith(otherObject) {
    // find vector from center of this object to center of other object
    const vectDif = [0, 1].map( i => this.pos[i] - otherObject.pos[i] );
    // find that vector's magnitude
    const magDif = Math.sqrt( vectDif.reduce( (total, el) => {
      return total + Math.pow(el, 2);
    }, 0 ));

    return magDif < (this.radius + otherObject.radius) ? true : false;
  }
}

export default MovingObject;
