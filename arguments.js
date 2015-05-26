function sum() {
  var total = 0;
  var args = Array.prototype.slice.call(arguments);

  args.forEach(function(num) {
    total += num;
  });

  return total;
}

Function.prototype.myBind = function () {
  var args = Array.prototype.slice.apply(arguments);
  var object = args.shift();
  var fn = this;
  return function() {
    fn.apply(object, args);
  };
};


var myFunction = function() {
  console.log(arguments);
  console.log(this);
};


// myFunction.myBind('this should be our this', 'this should be our arguments')();



function curriedSum(numArgs) {
  var numbers = [];

  function _curriedSum (num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      var total = 0;
      numbers.forEach(function(number) {
        total += number;
      });
      return total;
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}


// var sum = curriedSum(4);
// sum(5)(30)(20)(1); // => 56


Function.prototype.curry = function(numArgs) {
  var args = [];
  var fn = this;
  return function _curry (arg) {
    args.push(arg);
    if (args.length >= numArgs) {
      return fn.apply(fn, args);
    } else {
      return _curry;
    }
  };
};

function fn() {console.log(arguments);}

console.log(fn.curry(4)(2)(3)("a string")(3);
