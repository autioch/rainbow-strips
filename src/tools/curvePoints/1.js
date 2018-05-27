import chunk from 'lodash.chunk';
import clone from 'utils/clone';

/* eslint-disable max-statements */
/* eslint-disable no-plusplus */
/* eslint-disable no-mixed-operators */
/**
 * Calculates an array containing points representing a cardinal spline through given point array.
 *
 * @param {Array} points - (flat) point array: [x1, y1, x2, y2, ..., xn, yn]
 * @param {Number} [tension=0.5] - tension. Typically between [0.0, 1.0] but can be exceeded
 * @param {Number} [numOfSeg=25] - number of segments between two points (line resolution)
 * @returns {Float32Array} - the spline points.
 */
export default function getCurvePoints(points, tension = 0.5, numOfSeg = 25) {
  let i = 1;
  let rPos = 0;
  const count = points.length;
  const res = new Float32Array(((count - 2) * numOfSeg) + 2);
  const cache = new Float32Array((numOfSeg + 2) * 4);
  const pts = clone(points);
  let cachePointer = 4;

  pts.unshift(points[1]); // copy 1. point and insert at beginning
  pts.unshift(points[0]);
  pts.push(points[count - 2], points[count - 1]); // duplicate end-points

  // cache inner-loop calculations as they are based on t alone
  cache[0] = 1; // 1,0,0,0
  for (; i < numOfSeg; i++) {
    const st = i / numOfSeg;
    const st2 = st * st;
    const st3 = st2 * st;
    const st23 = st3 * 2;
    const st32 = st2 * 3;

    cache[cachePointer++] = st23 - st32 + 1; // c1
    cache[cachePointer++] = st32 - st23; // c2
    cache[cachePointer++] = st3 - 2 * st2 + st; // c3
    cache[cachePointer++] = st3 - st2; // c4
  }
  cache[++cachePointer] = 1; // 0,1,0,0

  // calc. points
  for (i = 2; i < count; i += 2) {
    const pt1 = pts[i];
    const pt2 = pts[i + 1];
    const pt3 = pts[i + 2];
    const pt4 = pts[i + 3];
    const t1x = (pt3 - pts[i - 2]) * tension;
    const t1y = (pt4 - pts[i - 1]) * tension;
    const t2x = (pts[i + 4] - pt1) * tension;
    const t2y = (pts[i + 5] - pt2) * tension;

    for (let t = 0; t < numOfSeg; t++) {
      // t * 4;
      const c = t << 2; // eslint-disable-line no-bitwise
      const c1 = cache[c];
      const c2 = cache[c + 1];
      const c3 = cache[c + 2];
      const c4 = cache[c + 3];

      res[rPos++] = c1 * pt1 + c2 * pt3 + c3 * t1x + c4 * t2x;
      res[rPos++] = c1 * pt2 + c2 * pt4 + c3 * t1y + c4 * t2y;
    }
  }

  // add last point
  res[rPos++] = points[points.length - 2];
  res[rPos] = points[points.length - 1];

  return chunk(res, 2);
}
