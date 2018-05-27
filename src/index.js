import { createCanvasManager, simplifyLineRDP, createGetPath, createMarkPoints, createSmoothDraw, performSmooth } from './tools';
import './styles.scss';

const canvasManager = createCanvasManager('body');
const get = () => canvasManager.add().ctx;

const getPath = createGetPath(get(), {
  color: '#ddd',
  width: 8
});

const markPointsOriginal = createMarkPoints(get(), {
  color: '#0f0',
  stroke: false,
  radius: 8
});

const markPointsSimplified = createMarkPoints(get(), {
  color: '#f00',
  stroke: false,
  radius: 4
});

const smoothDrawPoints = createSmoothDraw(get(), {
  color: '#f0f',
  width: 2
});

const smoothDrawSimplified = createSmoothDraw(get(), {
  color: '#00f',
  width: 2
});

const SIMPLIFY_MIN_LENGTH = 10;
const SMOOTH_MIN_LENGTH = 19.9;
const SMOOTH_ANGLE = 0.99;

window.addEventListener('mousedown', async (ev) => {
  const points = await getPath(ev);
  const simplified = simplifyLineRDP(points, SIMPLIFY_MIN_LENGTH);
  const smoothedSimplified = performSmooth(simplified, SMOOTH_MIN_LENGTH, SMOOTH_ANGLE);
  const smoothedNormal = performSmooth(points, SMOOTH_MIN_LENGTH, SMOOTH_ANGLE);

  markPointsOriginal(points);
  markPointsSimplified(simplified);
  smoothDrawPoints(smoothedNormal);
  smoothDrawSimplified(smoothedSimplified);
});
