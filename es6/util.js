class Util {
  static randomVec(length) {
    var angle = Math.floor(Math.random() * (Math.PI * 2));
    var x = Math.cos(angle) * length;
    var y = Math.sin(angle) * length;
    return [x, y];
  }
  static norm(vector) {
    var sum = 0;
    vector.forEach(function(el) {
      sum += (el * el);
    });

    return Math.sqrt(sum);
  }

  static unitVector(vector) {
    var result = [];
    var norm = Util.norm(vector);
    vector.forEach(function(el) {
      result.push(el / norm);
    });
    return result;
  }
}

export default Util;
