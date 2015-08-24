import MovingObject from './movingObject';

class Bullet extends MovingObject {
  constructor(params) {
    params.color = 'red';
    params.radius = 6;
    super(params);
    this.isWrappable = false;
  }
}

export default Bullet;
