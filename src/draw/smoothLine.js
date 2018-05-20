/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-depth */
/* eslint-disable max-statements */
/* eslint-disable complexity */
/* eslint-disable no-undefined */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable func-style */
/* eslint-disable func-names */
/* eslint-disable one-var */
/* eslint-disable sort-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-negated-condition */
/* eslint-disable no-use-before-define */

// This is my own smoothing method
// It creates a set of bezier control points either 2nd order or third order
// bezier curves.
// points: list of points
// cornerThres: when to smooth corners and represents the angle between to lines.
//     When the angle is smaller than the cornerThres then smooth.
// match: if true then the control points will be balanced.
// Function will make a copy of the points

export default function smoothLine(points, cornerThres, match) { // adds bezier control points at points if lines have angle less than thres
  var p1,
      p2,
      p3,
      dist1,
      dist2,
      x,
      y,
      endP,
      len,
      angle,
      i,
      newPoints,
      aLen,
      closed,
      bal,
      cont1,
      nx1,
      nx2,
      ny1,
      ny2,
      np;

  function dot(x, y, xx, yy) { // get do product
    // dist1,dist2,nx1,nx2,ny1,ny2 are the length and  normals and used outside function
    // normalise both vectors
    dist1 = Math.sqrt(x * x + y * y); // get length
    if (dist1 > 0) { // normalise
      nx1 = x / dist1;
      ny1 = y / dist1;
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
  newPoints = []; // array for new points
  aLen = points.length;
  if (aLen <= 2) { // nothing to if line too short
    for (i = 0; i < aLen; i++) { // ensure that the points are copied
      newPoints.push([points[i][0], points[i][1]]);
    }

    return newPoints;
  }
  p1 = points[0];
  endP = points[aLen - 1];
  i = 0; // start from second poitn if line not closed
  closed = false;
  len = Math.hypot(p1[0] - endP[0], p1[1] - endP[1]);
  if (len < Math.SQRT2) { // end points are the same. Join them in coordinate space
    endP = p1;
    i = 0; // start from first point if line closed
    p1 = points[aLen - 2];
    closed = true;
  }
  newPoints.push([points[i][0], points[i][1]]);
  for (; i < aLen - 1; i++) {
    p2 = points[i];
    p3 = points[i + 1];
    angle = Math.abs(dot(p2[0] - p1[0], p2[1] - p1[1], p3[0] - p2[0], p3[1] - p2[1]));
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
            var np = newPoints[newPoints.length - 1];

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
  if (closed) { // if closed then copy first point to last.
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
