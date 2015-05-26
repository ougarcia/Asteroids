Function.prototype.inherits = function(parentClass) {
  var Surrogate = function() {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
};


function MovingObject (name) {
  this.name = name;
}

MovingObject.prototype.changeDirection = function () {
  console.log("changed direction...");
};
var moving1 = new MovingObject("LAX Ball");
moving1.changeDirection(); // "changed direction..."


function Ship (name, captain) {
  MovingObject.apply(this, [name]);
  this.captain = captain;
}

Ship.inherits(MovingObject);

Ship.prototype.break = function() {
  console.log(this.name + "is broken");
};

function Asteroid () {}

Asteroid.inherits(MovingObject);

var ship1 = new Ship("Candy", "Karen");
ship1.changeDirection(); // "changed direction..."
ship1.break();
moving1.break();
