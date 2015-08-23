import MovingObject from './movingObject';

class Bullet extends MovingObject {
  constructor(params) {
    this.COLOR = 'red';
    this.RADIUS = 6;
    params['color'] = this.COLOR;
    params['radius'] = this.RADIUS;
    window.Asteroids.MovingObject.call(this, params);
  }
  isWrappable() {
    return true;
  }
}

export default Bullet;
