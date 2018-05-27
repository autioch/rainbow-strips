function getLineAngle(x1, y1, x2, y2) {
  let dx = x2 - x1,
      dy = y2 - y1,
      th = Math.atan2(dy, dx);

  return th * 180 / Math.PI;
}

function lineToAngle(x1, y1, length, angle) {
  angle *= Math.PI / 180;

  let x2 = x1 + length * Math.cos(angle),
      y2 = y1 + length * Math.sin(angle);

  return {
    x: x2,
    y: y2
  };
}

function quantX(pts) {
  let min = 99999999,
      max = -99999999,
      x,
      y,
      i,
      p = pts.length,
      res = [];

  // find min and max of x axis
  for (i = 0; i < pts.length - 1; i += 2) {
    if (pts[i] > max) {
      max = pts[i];
    }
    if (pts[i] < min) {
      min = pts[i];
    }
  }
  max = max - min;

  // this will quantize non-existng points
  function _getY(x) {
    let t = p,
        ptX1,
        ptX2,
        ptY1,
        ptY2,
        f,
        y;

    for (; t >= 0; t -= 2) {
      ptX1 = pts[t];
      ptY1 = pts[t + 1];

      if (x >= ptX1) {
        // p = t + 2;

        ptX2 = pts[t + 2];
        ptY2 = pts[t + 3];

        f = (ptY2 - ptY1) / (ptX2 - ptX1);
        y = (ptX1 - x) * f;

        return ptY1 - y;
      }
    }
  }

  // generate new array per-pixel on the x-axis
  // note: will not work if curve suddenly goes backwards
  for (i = 0; i < max; i++) {
    res.push(i);
    res.push(_getY(i));
  }

  return res;
}

/*            */
/*            */
cPoints = quantX(pointsFromCardinalSpline); // see below

// get points from array (dx = current array position)
x1 = cPoints[dx];
y1 = cPoints[dx + 1];

// get end-points from array (dlt=length, must be an even number)
x2 = cPoints[dx + dlt];
y2 = cPoints[dx + dlt + 1];

/*          */
/*          */
const dg = getLineAngle(x1, y1, x2, y2);
const l = (((lineToAngle(x1, y2, dlt, dg).x - x1) / 2) | 0) * 2;

x2 = cPoints[dx + l];
y2 = cPoints[dx + l + 1];
