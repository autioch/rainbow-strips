export default function createDrawPixels(ctx, options = {}) {
  const { width = 1, height = 1, color = '#aaa' } = options;

  ctx.fillStyle = color;

  return function drawPixels(points) {
    points.forEach((point) => {
      ctx.beginPath();
      ctx.fillRect(...point, width, height);
    });
  };
}
