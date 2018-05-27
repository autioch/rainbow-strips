export default function createDrawPixels(ctx, options = {}) {
  const { width = 1, height = 1 } = options;

  return function drawPixels(points) {
    points.forEach((point) => {
      ctx.beginPath();
      ctx.fillStyle = point.color;
      ctx.fillRect(point.x, point.y, width, height);
    });
  };
}
