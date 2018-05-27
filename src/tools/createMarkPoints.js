const DEFAULT_COLOR = '#ff0';
const DEFAULT_RADIUS = 3;

export default function createMarkPoints(ctx, options = {}) {
  const { color = DEFAULT_COLOR, radius = DEFAULT_RADIUS, stroke = true } = options;

  const prop = stroke ? 'stroke' : 'fill';

  ctx[`${prop}Style`] = color;

  return function markPoints(points) {
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(...point, radius, 0, 2 * Math.PI);
      ctx[prop]();
    });
  };
}
