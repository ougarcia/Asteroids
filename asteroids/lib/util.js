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
    if (Math.random() > 0.5) { x = x * -1};
    if (Math.random() > 0.5) { y = y * -1};
    return [x, y];
  };

})();
