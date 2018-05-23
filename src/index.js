import './styles.scss';
import drawAndSmooth from './draw';

const canvas = document.querySelector('#app-canvas');
const ctx = canvas.getContext('2d');

let width;
let height;
let ratio;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  ratio = window.devicePixelRatio;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);

  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#0f0';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

resizeCanvas();

drawAndSmooth(canvas, ctx);

window.addEventListener('resize', resizeCanvas);
