import MovingObject from './movingObject';

class Bullet extends MovingObject {
  constructor(params) {
    params['color'] = 'red';
    params['radius'] = 6;
    super(params);
    this.COLOR = params.color;
    this.RADIUS = params.radius;
    this.isWrappable = false;
  }
  isWrappable() {
    return true;
  }
}

export default Bullet;
