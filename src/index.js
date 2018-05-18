import './styles.scss';
import tests from './tests';

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

  canvas.fillStyle = '#0f0';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#0f0';
  ctx.strokeStyle = '#0f0';
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
}

resizeCanvas();

tests[5](canvas, ctx);

window.addEventListener('resize', resizeCanvas);
