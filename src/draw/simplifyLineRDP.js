/* eslint-disable max-statements */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable func-style */
/* eslint-disable func-names */
/* eslint-disable one-var */
/* eslint-disable sort-vars */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-redeclare */
/* eslint-disable vars-on-top */
/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */

// Line simplification based on
// the Ramer–Douglas–Peucker algorithm
// referance https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
// points are and array of arrays consisting of [[x,y],[x,y],...,[x,y]]
// length is in pixels and is the square of the actual distance.
// returns array of points of the same form as the input argument points.
export default function simplifyLineRDP(points, length) {
  var simplify = function(start, end) { // recursize simplifies points from start to end
    var maxDist,
        index,
        i,
        xx,
        yy,
        dx,
        dy,
        ddx,
        ddy,
        p1,
        p2,
        p,
        t,
        dist,
        dist1;

    p1 = points[start];
    p2 = points[end];
    xx = p1[0];
    yy = p1[1];
    ddx = p2[0] - xx;
    ddy = p2[1] - yy;
    dist1 = ddx * ddx + ddy * ddy;
    maxDist = length;
    for (var i = start + 1; i < end; i++) {
      p = points[i];
      if (ddx !== 0 || ddy !== 0) {
        t = ((p[0] - xx) * ddx + (p[1] - yy) * ddy) / dist1;
        if (t > 1) {
          dx = p[0] - p2[0];
          dy = p[1] - p2[1];
        } else
        if (t > 0) {
          dx = p[0] - (xx + ddx * t);
          dy = p[1] - (yy + ddy * t);
        } else {
          dx = p[0] - xx;
          dy = p[1] - yy;
        }
      } else {
        dx = p[0] - xx;
        dy = p[1] - yy;
      }
      dist = dx * dx + dy * dy;
      if (dist > maxDist) {
        index = i;
        maxDist = dist;
      }
    }

    if (maxDist > length) { // continue simplification while maxDist > length
      if (index - start > 1) {
        simplify(start, index);
      }
      newLine.push(points[index]);
      if (end - index > 1) {
        simplify(index, end);
      }
    }
  };
  const end = points.length - 1;
  var newLine = [points[0]];

  simplify(0, end);
  newLine.push(points[end]);

  return newLine;
}
