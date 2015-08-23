import GameView from './gameView';
window.Asteroids = {};

const canvasEl = document.getElementById('game-canvas');
canvasEl.height = window.innerHeight;
canvasEl.width = window.innerWidth;
new GameView(canvasEl.width, canvasEl.height, canvasEl).start();
