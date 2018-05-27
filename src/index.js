import { createCanvasManager, simplifyLineRDP, createGetPath, createMarkPoints, createSmoothDraw, performSmooth } from './tools';
import './styles.scss';

const canvasManager = createCanvasManager('body');
const get = () => canvasManager.add().ctx;

const getPath = createGetPath(get(), {
  color: '#ddd',
  width: 10
});

const markPointsOriginal = createMarkPoints(get(), {
  radius: 5
});

const markPointsSimplified = createMarkPoints(get(), {
  color: '#f00',
  stroke: false,
  radius: 3
});

const smoothDraw = createSmoothDraw(get(), {
  color: '#00f',
  width: 1
});

const SIMPLIFY_MIN_LENGTH = 10;
const SMOOTH_MIN_LENGTH = 19.9;
const SMOOTH_ANGLE = 0.99;

window.addEventListener('mousedown', async (ev) => {
  const points = await getPath(ev);
  const simplified = simplifyLineRDP(points, SIMPLIFY_MIN_LENGTH);
  const smoothed = performSmooth(simplified, SMOOTH_MIN_LENGTH, SMOOTH_ANGLE);

  markPointsOriginal(points);
  markPointsSimplified(simplified);
  smoothDraw(smoothed);
});
