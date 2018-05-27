const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;

const cBez1 = [{
  x: 250,
  y: 120
}, {
  x: 290,
  y: -40
}, {
  x: 300,
  y: 200
}, {
  x: 400,
  y: 150
}];

drawBez(cBez1);

const cPoints = findCBezPoints(cBez1);

drawPlots(cPoints);

function findCBezPoints(b) {
  const startPt = b[0];
  const controlPt1 = b[1];
  const controlPt2 = b[2];
  const endPt = b[3];
  const pts = [b[0]];
  let lastPt = b[0];
  const tests = 5000;

  for (let t = 0; t <= tests; t++) {
    // calc another point along the curve
    const pt = getCubicBezierXYatT(b[0], b[1], b[2], b[3], t / tests);

    // add the pt if it's not already in the pts[] array
    const dx = pt.x - lastPt.x;
    const dy = pt.y - lastPt.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const dInt = parseInt(d);

    if (dInt > 0 || t == tests) {
      lastPt = pt;
      pts.push(pt);
    }
  }

  return pts;
}

// Given the 4 control points on a Bezier curve
// Get x,y at interval T along the curve (0<=T<=1)
// The curve starts when T==0 and ends when T==1
function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
  const x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  const y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);

  return {
    x,
    y
  };
}

// cubic helper formula
function CubicN(T, a, b, c, d) {
  const t2 = T * T;
  const t3 = t2 * T;

  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function drawPlots(pts) {
  ctx.fillStyle = 'red';

  // don't draw the last dot b/ its radius will display past the curve
  for (let i = 0; i < pts.length - 1; i++) {
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, 1, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBez(b) {
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(b[0].x, b[0].y);
  ctx.bezierCurveTo(b[1].x, b[1].y, b[2].x, b[2].y, b[3].x, b[3].y);
  ctx.stroke();
}
