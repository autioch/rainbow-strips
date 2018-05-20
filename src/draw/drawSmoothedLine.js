export default function drawSmoothedLine(line, ctx) {
  let i;
  let p;
  let p1;

  ctx.beginPath();
  ctx.moveTo(line[0][0], line[0][1]);
  for (i = 0; i < line.length - 1; i++) {
    p = line[i];
    p1 = line[i + 1];
    if (p.length === 2) { // linear
      ctx.lineTo(p[0], p[1]);
    } else
    if (p.length === 4) { // bezier 2nd order
      ctx.quadraticCurveTo(p[2], p[3], p1[0], p1[1]);
    } else { // bezier 3rd order
      ctx.bezierCurveTo(p[2], p[3], p[4], p[5], p1[0], p1[1]);
    }
  }
  if (p.length === 2) {
    ctx.lineTo(p1[0], p1[1]);
  }
  ctx.stroke();
}
