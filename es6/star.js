class Star {
  constructor(pos) {
    this.pos = pos;
    this.color = 'white';
    this.radius = this.randomRadius();
    setInterval(this.changeRadius.bind(this), 100);
  }
  changeRadius() {
    this.radius = this.randomRadius();
  }
  randomRadius() {
    return (Math.random() * 4);
  }
  move() {
    //do nothing, this is just to make the code in game cleaner
    return null;
  }
  draw() {
    const ctx = window.Asteroids.ctx;
    ctx.fillStyle = 'white';
    ctx.beginPath();
    // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    ctx.arc(...this.pos, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  }
}

export default Star;
