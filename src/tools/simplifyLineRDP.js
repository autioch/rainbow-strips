/* eslint-disable no-mixed-operators */

function getXY(p, start, end) {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const [pX, pY] = p;
  const ddx = endX - startX;
  const ddy = endY - startY;

  if (ddx !== 0 || ddy !== 0) {
    const dist = ddx * ddx + ddy * ddy;
    const t = ((pX - startX) * ddx + (pY - startY) * ddy) / dist;

    if (t > 1) {
      return [pX - endX, pY - endY];
    } else if (t > 0) {
      return [pX - (startX + ddx * t), pY - (startY + ddy * t)];
    }

    return [pX - startX, pY - startY];
  }

  return [pX - startX, pY - startY];
}

// Line simplification based on
// the Ramer–Douglas–Peucker algorithm
// referance https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
// points are and array of arrays consisting of [[x,y],[x,y],...,[x,y]]
// minLength is in pixels and is the square of the actual distance.
// returns array of points of the same form as the input argument points.
export default function simplifyLineRDP(points, minLength) {
  const newLine = [points[0]];

  function simplify(start, end) { // recursize simplifies points from start to end
    const p1 = points[start];
    const p2 = points[end];
    let maxDist = minLength;
    let index = start + 1;

    for (let i = start + 1; i < end; i++) {
      const p = points[i];
      const [dx, dy] = getXY(p, p1, p2);
      const dist = dx * dx + dy * dy;

      if (dist > maxDist) {
        index = i;
        maxDist = dist;
      }
    }

    if (maxDist > minLength) { // continue simplification while maxDist > minLength
      if (index - start > 1) {
        simplify(start, index);
      }
      newLine.push(points[index]);
      if (end - index > 1) {
        simplify(index, end);
      }
    }
  }

  simplify(0, points.length - 1);

  newLine.push(points[points.length - 1]);

  return newLine;
}
