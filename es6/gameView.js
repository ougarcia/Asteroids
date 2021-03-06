import Game from './game';

class GameView {
  constructor(xDim, yDim, canvas) {
    window.Asteroids.dims = [xDim, yDim];
    window.Asteroids.ctx = canvas.getContext('2d');
    this.game = new Game(xDim, yDim);
    window.Asteroids.currentGame = this.game;
  }
  start() {
    this.bindKeyHandlers();
    window.setInterval(() => {
      this.game.step();
      this.checkKeys();
      this.game.draw();
    }, 10 );
  }
  bindKeyHandlers() {
    // this is to disable the default action for the kys used in the game
    window.key('up, down, space, left, right', () => false );
  }
  checkKeys() {
    const ship = this.game.ship;
    if (!ship) {
      return;
    }
    window.key.isPressed('up') && ship.thrust();
    window.key.isPressed('down') && ship.brake();
    window.key.isPressed('space') && ship.bulletAvailable && ship.fireBullet();
    window.key.isPressed('left') && ship.rotate({ reverse: false });
    window.key.isPressed('right') && ship.rotate({ reverse: true });
  }
}

export default GameView;
