/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _gameView = __webpack_require__(1);

	var _gameView2 = _interopRequireDefault(_gameView);

	window.Asteroids = {};

	var canvasEl = document.getElementById('game-canvas');
	canvasEl.height = window.innerHeight;
	canvasEl.width = window.innerWidth;
	new _gameView2['default'](canvasEl.width, canvasEl.height, canvasEl).start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	var GameView = (function () {
	  function GameView(xDim, yDim, canvas) {
	    _classCallCheck(this, GameView);

	    window.Asteroids.dims = [xDim, yDim];
	    window.Asteroids.ctx = canvas.getContext('2d');
	    this.game = new _game2['default'](xDim, yDim);
	    window.Asteroids.currentGame = this.game;
	  }

	  _createClass(GameView, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;

	      this.bindKeyHandlers();
	      window.setInterval(function () {
	        _this.game.step();
	        _this.checkKeys();
	        _this.game.draw();
	      }, 10);
	    }
	  }, {
	    key: 'bindKeyHandlers',
	    value: function bindKeyHandlers() {
	      // this is to disable the default action for the kys used in the game
	      window.key('up, down, space, left, right', function () {
	        return false;
	      });
	    }
	  }, {
	    key: 'checkKeys',
	    value: function checkKeys() {
	      var ship = this.game.ship;
	      if (!ship) {
	        return;
	      }
	      window.key.isPressed('up') && ship.thrust();
	      window.key.isPressed('down') && ship.brake();
	      window.key.isPressed('space') && ship.bulletAvailable && ship.fireBullet();
	      window.key.isPressed('left') && ship.rotate({ reverse: false });
	      window.key.isPressed('right') && ship.rotate({ reverse: true });
	    }
	  }]);

	  return GameView;
	})();

	exports['default'] = GameView;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _asteroid = __webpack_require__(3);

	var _asteroid2 = _interopRequireDefault(_asteroid);

	var _ship = __webpack_require__(6);

	var _ship2 = _interopRequireDefault(_ship);

	var _star = __webpack_require__(8);

	var _star2 = _interopRequireDefault(_star);

	var Game = (function () {
	  function Game(xDim, yDim) {
	    _classCallCheck(this, Game);

	    this.ctx = window.Asteroids.ctx;
	    this.NUM_ASTEROIDS = 3;
	    this.lives = 3;
	    this.DIM_X = xDim;
	    this.DIM_Y = yDim;
	    this.asteroids = [];
	    this.bullets = [];
	    this.stars = [];
	    this.addStars();
	    for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
	      this.addAsteroids();
	    }
	    this.addShip();
	  }

	  _createClass(Game, [{
	    key: 'randomPosition',
	    value: function randomPosition() {
	      var pos = [this.DIM_X, this.DIM_Y].map(function (dim) {
	        return Math.floor(Math.random() * dim);
	      });
	      return pos;
	    }
	  }, {
	    key: 'addAsteroids',
	    value: function addAsteroids() {
	      var position1 = this.randomPosition();
	      this.asteroids.push(_asteroid2['default'].newBigAsteroid({ 'pos': position1 }));
	    }
	  }, {
	    key: 'addShip',
	    value: function addShip() {
	      var position = this.randomPosition();
	      this.ship = new _ship2['default']({ 'pos': position });
	    }
	  }, {
	    key: 'addStars',
	    value: function addStars() {
	      var starCount = 30;
	      for (var i = 0; i < starCount; i++) {
	        var pos = this.randomPosition();
	        this.stars.push(new _star2['default'](pos));
	      }
	    }
	  }, {
	    key: 'allObjects',
	    value: function allObjects() {
	      var allObjectsArr = [].concat(_toConsumableArray(this.stars), _toConsumableArray(this.asteroids), _toConsumableArray(this.bullets));
	      if (this.ship) allObjectsArr.push(this.ship);
	      return allObjectsArr;
	    }
	  }, {
	    key: 'backgroundFill',
	    value: function backgroundFill() {
	      this.ctx.fillStyle = '#283642';
	      this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.ctx.strokeStyle = "#283642";
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var _this = this;

	      this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.backgroundFill();
	      this.drawLives();
	      this.allObjects().forEach(function (object) {
	        return object.draw(_this.ctx);
	      });
	    }
	  }, {
	    key: 'drawLives',
	    value: function drawLives() {
	      var x = 5;
	      var y = 5;

	      var img = new Image();
	      img.src = "ship.svg";
	      for (var i = 0; i < this.lives; i++) {
	        this.ctx.beginPath();
	        this.ctx.drawImage(img, x, y, 20, 40);
	        this.ctx.closePath();
	        x += 30;
	      }
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.allObjects().forEach(function (object) {
	        return object.move();
	      });
	    }
	  }, {
	    key: 'wrap',
	    value: function wrap(pos, object) {
	      // TODO: if not wrappable then remove;
	      if (!object.isWrappable) return pos;

	      [0, 1].forEach(function (i) {
	        if (pos[i] > window.Asteroids.dims[i]) {
	          pos[i] = pos[i] % window.Asteroids.dims[i];
	        } else if (pos[i] < 0) {
	          pos[i] = window.Asteroids.dims[i] - pos[i];
	        }
	      });
	      return pos;
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var _this2 = this;

	      // might want to use for of instead of forEach
	      this.bullets.forEach(function (bullet) {
	        _this2.asteroids.forEach(function (asteroid) {
	          if (bullet.isCollidedWith(asteroid)) {
	            _this2.removeBullet(bullet);
	            _this2.removeAsteroid(asteroid);
	          }
	        });
	      });
	      this.asteroids.forEach(function (asteroid) {
	        if (!!_this2.ship && _this2.ship.isCollidedWith(asteroid)) _this2.resetShip();
	      });
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.moveObjects();
	      this.checkCollisions();
	    }
	  }, {
	    key: 'removeAsteroid',
	    value: function removeAsteroid(asteroid) {
	      var asteroidIndex = this.asteroids.indexOf(asteroid);
	      this.asteroids.splice(asteroidIndex, 1);
	      this.asteroids = this.asteroids.concat(asteroid.spawnChildren());
	    }
	  }, {
	    key: 'removeBullet',
	    value: function removeBullet(bullet) {
	      var bulletIndex = this.bullets.indexOf(bullet);
	      this.bullets.splice(bulletIndex, 1);
	    }
	  }, {
	    key: 'resetShip',
	    value: function resetShip() {
	      delete this.ship;
	      this.lives--;
	      this.lives && setTimeout(this.addShip.bind(this), 1000);
	    }
	  }]);

	  return Game;
	})();

	exports['default'] = Game;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _movingObject = __webpack_require__(5);

	var _movingObject2 = _interopRequireDefault(_movingObject);

	var Asteroid = (function (_MovingObject) {
	  _inherits(Asteroid, _MovingObject);

	  function Asteroid(params) {
	    _classCallCheck(this, Asteroid);

	    params.color = '#7A7371';
	    params.radius = params.radius || 40;
	    params.vel = _util2['default'].randomVec(Math.floor(Math.random() * 3 + 1));
	    _get(Object.getPrototypeOf(Asteroid.prototype), 'constructor', this).call(this, params);
	  }

	  _createClass(Asteroid, [{
	    key: 'spawnChildren',
	    value: function spawnChildren() {
	      if (this.radius <= 20) return [];
	      var params = { pos: this.pos, radius: this.radius - 20 };
	      //const newAsteroids = [0, 0].map(() => new Asteroid(params));
	      var newAsteroids = [];
	      // this is dumb but javascript [] === [] is stupid
	      var vels = [];

	      var _loop = function () {
	        var can = new Asteroid(params);
	        if (vels.filter(function (vel) {
	          return _util2['default'].areSameVectors(vel, can.vel);
	        }).length === 0) {
	          newAsteroids.push(can);
	        }
	      };

	      while (newAsteroids.length < 2) {
	        _loop();
	      }
	      return newAsteroids;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var ctx = window.Asteroids.ctx;
	      ctx.beginPath();
	      var img = new Image();
	      img.src = "asteroid.png";
	      var x = this.pos[0] - this.radius;
	      var y = this.pos[1] - this.radius;
	      ctx.drawImage(img, x, y, this.radius * 2, this.radius * 2);
	    }
	  }], [{
	    key: 'newBigAsteroid',
	    value: function newBigAsteroid(params) {
	      params.radius = 60;
	      return new Asteroid(params);
	    }
	  }, {
	    key: 'newMediumAsteroid',
	    value: function newMediumAsteroid(params) {
	      params.radius = 40;
	      return new Asteroid(params);
	    }
	  }, {
	    key: 'newSmallAsteroid',
	    value: function newSmallAsteroid(params) {
	      params.radius = 20;
	      return new Asteroid(params);
	    }
	  }]);

	  return Asteroid;
	})(_movingObject2['default']);

	exports['default'] = Asteroid;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Util = (function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }

	  _createClass(Util, null, [{
	    key: "randomVec",
	    value: function randomVec(length) {
	      var angle = Math.floor(Math.random() * (Math.PI * 2));
	      var x = Math.cos(angle) * length;
	      var y = Math.sin(angle) * length;

	      return [x, y];
	    }
	  }, {
	    key: "norm",
	    value: function norm(vector) {
	      var sum = vector.reduce(function (total, el) {
	        return total + Math.pow(el, 2);
	      }, 0);
	      return Math.sqrt(sum);
	    }
	  }, {
	    key: "unitVector",
	    value: function unitVector(vector) {
	      var norm = Util.norm(vector);
	      var result = vector.map(function (el) {
	        return el / norm;
	      });
	      return result;
	    }
	  }, {
	    key: "areSameVectors",
	    value: function areSameVectors(v1, v2) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = v2.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2);

	          var idx = _step$value[0];
	          var el = _step$value[1];

	          if (el !== v2[idx]) return false;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator["return"]) {
	            _iterator["return"]();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return true;
	    }
	  }]);

	  return Util;
	})();

	exports["default"] = Util;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MovingObject = (function () {
	  function MovingObject(_ref) {
	    var pos = _ref.pos;
	    var vel = _ref.vel;
	    var radius = _ref.radius;
	    var color = _ref.color;

	    _classCallCheck(this, MovingObject);

	    var _ref2 = [pos, vel, radius, color];
	    this.pos = _ref2[0];
	    this.vel = _ref2[1];
	    this.radius = _ref2[2];
	    this.color = _ref2[3];

	    this.isWrappable = true;
	  }

	  _createClass(MovingObject, [{
	    key: "draw",
	    value: function draw() {
	      var ctx = window.Asteroids.ctx;
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);

	      ctx.fill();
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      var _this = this;

	      var newPosition = this.pos.map(function (pos, i) {
	        return pos + _this.vel[i];
	      });
	      this.pos = window.Asteroids.currentGame.wrap(newPosition, this);
	    }
	  }, {
	    key: "isCollidedWith",
	    value: function isCollidedWith(otherObject) {
	      var _this2 = this;

	      // find vector from center of this object to center of other object
	      var vectDif = [0, 1].map(function (i) {
	        return _this2.pos[i] - otherObject.pos[i];
	      });
	      // find that vector's magnitude
	      var magDif = Math.sqrt(vectDif.reduce(function (total, el) {
	        return total + Math.pow(el, 2);
	      }, 0));

	      return magDif < this.radius + otherObject.radius ? true : false;
	    }
	  }]);

	  return MovingObject;
	})();

	exports["default"] = MovingObject;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _movingObject = __webpack_require__(5);

	var _movingObject2 = _interopRequireDefault(_movingObject);

	var _bullet = __webpack_require__(7);

	var _bullet2 = _interopRequireDefault(_bullet);

	var Ship = (function (_MovingObject) {
	  _inherits(Ship, _MovingObject);

	  function Ship(params) {
	    _classCallCheck(this, Ship);

	    params.color = 'red';
	    params.radius = 20;
	    params.vel = [0, 0];
	    _get(Object.getPrototypeOf(Ship.prototype), 'constructor', this).call(this, params);
	    this.bulletAvailable = true;
	    this.rotation = 0;
	    this.decelerationCounter = 0;
	  }

	  _createClass(Ship, [{
	    key: 'power',
	    value: function power(impulse) {
	      if (_util2['default'].norm(this.vel) < 4) {
	        this.vel = this.vel.map(function (subVel, idx) {
	          return subVel + impulse[idx] * 0.1;
	        });
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var ctx = window.Asteroids.ctx;

	      var _pos = _slicedToArray(this.pos, 2);

	      var x = _pos[0];
	      var y = _pos[1];

	      ctx.save();
	      ctx.translate(x, y);
	      ctx.rotate(this.rotation);
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	      var img = new Image();
	      img.src = "ship.svg";
	      ctx.drawImage(img, -this.radius, -this.radius * 2, this.radius * 2, this.radius * 4);
	      ctx.closePath();
	      ctx.restore();
	    }
	  }, {
	    key: 'fireBullet',
	    value: function fireBullet() {
	      var _this = this;

	      var velocity = _util2['default'].unitVector(this.velocityVector()).map(function (subVel) {
	        return subVel * 11;
	      });
	      var bullet = new _bullet2['default']({ pos: this.pos, vel: velocity });
	      window.Asteroids.currentGame.bullets.push(bullet);
	      this.bulletAvailable = false;
	      setTimeout(function () {
	        return _this.bulletAvailable = true;
	      }, 500);
	    }
	  }, {
	    key: 'velocityVector',
	    value: function velocityVector() {
	      // vector w/ magnitude 1 that points in the direction the ship is going
	      return [Math.sin(this.rotation), -Math.cos(this.rotation)];
	    }
	  }, {
	    key: 'thrust',
	    value: function thrust() {
	      this.power(this.velocityVector());
	    }
	  }, {
	    key: 'brake',
	    value: function brake() {
	      this.vel = this.vel.map(function (subVel) {
	        return subVel * 0.97;
	      });
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate(params) {
	      this.rotation += Math.PI / 48 * (params.reverse ? 1 : -1);
	      if (this.rotation < 0) {
	        this.rotation = 2 * Math.PI + this.rotation;
	      } else if (this.rotation >= 2 * Math.PI) {
	        this.rotation -= 2 * Math.PI;
	      }
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.decelerationCounter += 1;
	      if (this.decelerationCounter > 40) {
	        this.decelerationCounter = 0;
	        this.decelerate();
	      }
	      _get(Object.getPrototypeOf(Ship.prototype), 'move', this).call(this);
	    }
	  }, {
	    key: 'decelerate',
	    value: function decelerate() {
	      this.vel = this.vel.map(function (subVel) {
	        return subVel * 0.9;
	      });
	    }
	  }]);

	  return Ship;
	})(_movingObject2['default']);

	exports['default'] = Ship;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _movingObject = __webpack_require__(5);

	var _movingObject2 = _interopRequireDefault(_movingObject);

	var Bullet = (function (_MovingObject) {
	  _inherits(Bullet, _MovingObject);

	  function Bullet(params) {
	    _classCallCheck(this, Bullet);

	    params.color = 'red';
	    params.radius = 6;
	    _get(Object.getPrototypeOf(Bullet.prototype), 'constructor', this).call(this, params);
	    this.isWrappable = false;
	  }

	  return Bullet;
	})(_movingObject2['default']);

	exports['default'] = Bullet;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Star = (function () {
	  function Star(pos) {
	    _classCallCheck(this, Star);

	    this.pos = pos;
	    this.color = 'white';
	    this.radius = this.randomRadius();
	    setInterval(this.changeRadius.bind(this), 100);
	  }

	  _createClass(Star, [{
	    key: 'changeRadius',
	    value: function changeRadius() {
	      this.radius = this.randomRadius();
	    }
	  }, {
	    key: 'randomRadius',
	    value: function randomRadius() {
	      return Math.random() * 4;
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      // do nothing, this is just to make the code in game.js cleaner
	      return null;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      var ctx = window.Asteroids.ctx;
	      ctx.fillStyle = 'white';
	      ctx.beginPath();
	      // ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
	      ctx.arc.apply(ctx, _toConsumableArray(this.pos).concat([this.radius, 0, 2 * Math.PI, false]));
	      ctx.fill();
	    }
	  }]);

	  return Star;
	})();

	exports['default'] = Star;
	module.exports = exports['default'];

/***/ }
/******/ ]);