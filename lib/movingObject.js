(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = window.Asteroids.MovingObject = function(params) {
    this.pos = params['pos'];
    this.vel = params['vel'];
    this.radius = params['radius'];
    this.color = params['color'];
  };

  MovingObject.prototype.draw = function() {
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
  };

  MovingObject.prototype.move = function () {
    var result = [];
    for(var i = 0; i < 2; i++) {
      result[i] = this.pos[i] + this.vel[i];
    }

    this.pos = window.Asteroids.Game.wrap(result);
  };


  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var posDif = 0;
    for (var i = 0; i < 2; i++){
      posDif += Math.pow((this.pos[i] - otherObject.pos[i]), 2);
    }
    posDif = Math.sqrt(posDif);
    if (posDif < (this.radius + otherObject.radius)) {
      return true;
    } else {
      return false;
    }
  };

  MovingObject.prototype.collideWith = function(otherObject) {
    window.Asteroids.currentGame.removeIt(otherObject);
    window.Asteroids.currentGame.removeIt(this);
  };
})();
