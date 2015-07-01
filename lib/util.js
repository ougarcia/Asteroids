(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = window.Asteroids.Util = {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.randomVec = function(length) {
    var angle = Math.floor(Math.random() * (Math.PI / 2));
    var x = Math.cos(angle) * length;
    var y = Math.sin(angle) * length;
    if (Math.random() > 0.5) { x = x * -1;}
    if (Math.random() > 0.5) { y = y * -1;}
    return [x, y];
  };

  Util.norm = function(vector) {
    var sum = 0;
    vector.forEach(function(el) {
      sum += (el * el);
    });

    return Math.sqrt(sum);
  };

  Util.unitVector = function(vector) {
    var result = [];
    var norm = Asteroids.Util.norm(vector);
    vector.forEach(function(el) {
      result.push(el / norm);
    });
    return result;
  };

})();
