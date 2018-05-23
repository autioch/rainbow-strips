/* eslint-disable max-depth */
/* eslint-disable max-statements */
/* eslint-disable no-mixed-operators */

// This is my own smoothing method
// It creates a set of bezier control points either 2nd order or third order
// bezier curves.
// points: list of points
// cornerThres: when to smooth corners and represents the angle between to lines.
//     When the angle is smaller than the cornerThres then smooth.
// match: if true then the control points will be balanced.
// Function will make a copy of the points

// adds bezier control points at points if lines have angle less than thres
export default function smoothLine(points, cornerThres, match) {
  let p1;
  let p2;
  let p3;
  let dist1;
  let dist2;
  let x;
  let y;
  let endP;
  let len;
  let angle;
  let i;
  let isClosed;
  let nx1;
  let nx2;
  let ny1;
  let ny2;

  function dot(point, current, next) { // get do product
    const cx = current[0] - point[0];
    const cy = current[1] - point[1];
    const xx = next[0] - current[0];
    const yy = next[1] - current[1];

    // dist1,dist2,nx1,nx2,ny1,ny2 are the length and  normals and used outside function
    // normalise both vectors
    dist1 = Math.sqrt(cx * cx + cy * cy); // get length
    if (dist1 > 0) { // normalise
      nx1 = cx / dist1;
      ny1 = cy / dist1;
    } else {
      nx1 = 1; // need to have something so this will do as good as anything
      ny1 = 0;
    }
    dist2 = Math.sqrt(xx * xx + yy * yy);
    if (dist2 > 0) {
      nx2 = xx / dist2;
      ny2 = yy / dist2;
    } else {
      nx2 = 1;
      ny2 = 0;
    }

    return Math.acos(nx1 * nx2 + ny1 * ny2); // dot product
  }

  const newPoints = []; // array for new points
  const aLen = points.length;

  if (aLen <= 2) { // nothing to if line too short
    for (i = 0; i < aLen; i++) { // ensure that the points are copied
      newPoints.push([points[i][0], points[i][1]]);
    }

    return newPoints;
  }

  [p1] = points;
  endP = points[aLen - 1];
  i = 0; // start from second poitn if line not isClosed
  isClosed = false;
  len = Math.hypot(p1[0] - endP[0], p1[1] - endP[1]);

  if (len < Math.SQRT2) { // end points are the same. Join them in coordinate space
    endP = p1;
    i = 0; // start from first point if line isClosed
    p1 = points[aLen - 2];
    isClosed = true;
  }

  newPoints.push([points[i][0], points[i][1]]);

  for (; i < aLen - 1; i++) {
    p2 = points[i];
    p3 = points[i + 1];
    angle = Math.abs(dot(p1, p2, p3));
    if (dist1 !== 0) { // dist1 and dist2 come from dot function
      if (angle < cornerThres * 3.14) { // bend it if angle between lines is small
        if (match) {
          dist1 = Math.min(dist1, dist2);
          dist2 = dist1;
        }

        // use the two normalized vectors along the lines to create the tangent vector
        x = (nx1 + nx2) / 2;
        y = (ny1 + ny2) / 2;
        len = Math.sqrt(x * x + y * y); // normalise the tangent
        if (len === 0) {
          newPoints.push([p2[0], p2[1]]);
        } else {
          x /= len;
          y /= len;
          if (newPoints.length > 0) {
            const np = newPoints[newPoints.length - 1];

            np.push(p2[0] - x * dist1 * 0.25);
            np.push(p2[1] - y * dist1 * 0.25);
          }
          newPoints.push([ // create the new point with the new bezier control points.
            p2[0],
            p2[1],
            p2[0] + x * dist2 * 0.25,
            p2[1] + y * dist2 * 0.25
          ]);
        }
      } else {
        newPoints.push([p2[0], p2[1]]);
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
    newPoints.push([points[points.length - 1][0], points[points.length - 1][1]]);
  }

  return newPoints;
}
