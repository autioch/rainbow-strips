export default function isPointInPath(ctx, width, height) {
  function isInCanvas([x, y]) {
    return x > 0 && y > 0 && x < width && y < height;
  }

  function isInPath([x, y]) {
    const p = ctx.getImageData(x, y, 1, 1).data;

    return p[0] === 0 && p[1] === 255 && p[2] === 0;
  }

  return (point, directionPoint, distance) => {
    const [x, y] = point;
    const dx = directionPoint[0] - x;
    const dy = directionPoint[1] - y;

    for (let i = 1; i < distance; i++) {
      const nextPoint = [x + (dx * i), y + (dy * i)];
      const inCanvas = isInCanvas(nextPoint);
      const inPath = isInPath(nextPoint);

      if (!inCanvas || !inPath) {
        return false;
      }
    }

    return true;
  };
}
