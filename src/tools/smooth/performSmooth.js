/* eslint-disable max-depth */
/* eslint-disable max-statements */
/* eslint-disable no-mixed-operators */

// It creates a set of bezier control points either 2nd order or third order
// bezier curves.
// points: list of points
// cornerThres: when to smooth corners and represents the angle between to lines.
//     When the angle is smaller than the cornerThres then smooth.
// match: if true then the control points will be balanced.
// Function will make a copy of the points

// adds bezier control points at points if lines have angle less than thres
export default function performSmooth(points, cornerThres, match) {
  const newPoints = []; // array for new points
  const aLen = points.length;
  let i;

  if (aLen <= 2) { // nothing to if line too short
    for (i = 0; i < aLen; i++) { // ensure that the points are copied
      newPoints.push([...points[i]]);
    }

    return newPoints;
  }

  const endP = points[aLen - 1];
  let [p1] = points;

  i = 0; // start from second poitn if line not isClosed
  let isClosed = false;

  // end points are the same. Join them in coordinate space
  if (Math.hypot(p1[0] - endP[0], p1[1] - endP[1]) < Math.SQRT2) {
    i = 0; // start from first point if line isClosed
    p1 = points[aLen - 2];
    isClosed = true;
  }

  newPoints.push([...points[i]]);

  for (; i < aLen - 1; i++) {
    const p2 = points[i];
    const p3 = points[i + 1];
    const cx = p2[0] - p1[0];
    const cy = p2[1] - p1[1];
    const xx = p3[0] - p2[0];
    const yy = p3[1] - p2[1];
    let dist1 = Math.sqrt(cx * cx + cy * cy); // get length
    const nx1 = dist1 > 0 ? cx / dist1 : 1;
    const ny1 = dist1 > 0 ? cy / dist1 : 0;
    let dist2 = Math.sqrt(xx * xx + yy * yy);
    const nx2 = dist2 > 0 ? xx / dist2 : 1;
    const ny2 = dist2 > 0 ? yy / dist2 : 0;
    const angle = Math.abs(Math.acos(nx1 * nx2 + ny1 * ny2));

    if (dist1 !== 0) { // dist1 and dist2 come from dot function
      if (angle < cornerThres * 3.14) { // bend it if angle between lines is small
        if (match) {
          dist2 = dist1;
          dist1 = Math.min(dist1, dist2);
        }

        // use the two normalized vectors along the lines to create the tangent vector
        let x = (nx1 + nx2) / 2;
        let y = (ny1 + ny2) / 2;
        const len2 = Math.sqrt(x * x + y * y); // normalise the tangent

        if (len2 === 0) {
          newPoints.push([...p2]);
        } else {
          x /= len2;
          y /= len2;
          if (newPoints.length > 0) {
            const np = newPoints[newPoints.length - 1];

            np.push(p2[0] - x * dist1 * 0.25);
            np.push(p2[1] - y * dist1 * 0.25);
          }
          newPoints.push([p2[0], p2[1], p2[0] + x * dist2 * 0.25, p2[1] + y * dist2 * 0.25]);
        }
      } else {
        newPoints.push([...p2]);
      }
    }
    p1 = p2;
  }

  if (isClosed) { // if isClosed then copy first point to last.
    p1 = [];
    for (i = 0; i < newPoints[0].length; i++) {
      p1.push(newPoints[0][i]);
    }
    newPoints.push(p1);
  } else {
    newPoints.push([...points[points.length - 1]]);
  }

  return newPoints;
}
