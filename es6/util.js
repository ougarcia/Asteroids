class Util {
  static randomVec(length) {
    const angle = Math.floor(Math.random() * (Math.PI * 2));
    const [x, y] = [Math.cos(angle) * length, Math.sin(angle) * length];
    return [x, y];
  }
  static norm(vector) {
    const sum = vector.reduce((total, el) => total + Math.pow(el, 2), 0);
    return Math.sqrt(sum);
  }
  static unitVector(vector) {
    const norm = Util.norm(vector);
    const result = vector.map(el => el / norm);
    return result;
  }
  static areSameVectors(v1, v2) {
    for (let [idx, el] of v2.entries()) {
      if (el !== v2[idx]) return false;
    }
    return true;
  }
}

export default Util;
