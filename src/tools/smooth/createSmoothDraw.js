const DEFAULT_COLOR = '#00f';
const DEFAULT_WIDTH = 1;

export default function drawSmooth(ctx, options = {}) {
  const { color = DEFAULT_COLOR, width = DEFAULT_WIDTH } = options;

  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  return function draw(line) {
    let i;
    let p;
    let p1;

    ctx.beginPath();
    ctx.moveTo(...line[0]);

    for (i = 0; i < line.length - 1; i++) {
      p = line[i];
      p1 = line[i + 1];

      if (p.length === 2) { // linear
        ctx.lineTo(...p);
      } else if (p.length === 4) { // bezier 2nd order
        ctx.quadraticCurveTo(p[2], p[3], p1[0], p1[1]);
      } else { // bezier 3rd order
        ctx.bezierCurveTo(p[2], p[3], p[4], p[5], p1[0], p1[1]);
      }
      ctx.stroke();
    }

    if (p.length === 2) {
      ctx.lineTo(...p1);
    }
    ctx.stroke();
  };
}
