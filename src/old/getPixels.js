import isPointInPath from './isPointInPath';

/* eslint-disable max-statements */
function neighbourFinder(width, height) {
  return (x, y) => [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1]
  ].filter(([x1, y1]) => x1 > 0 && y1 > 0 && x1 < width && y1 < height);
}

function getAngle(p1, p2) {
  return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
}

function getNextPoint(prevPoint, currentPoint, nextPoints) {
  if (nextPoints.length === 0) {
    return null;
  }

  if (nextPoints.length === 1) {
    return nextPoints[0];
  }

  /* TODO  */
  if (!prevPoint) {
    return nextPoints[0];
  }

  /* Find point in the straight line if possible */
  const prevAngle = getAngle(prevPoint, currentPoint);

  const pointsWithDiff = nextPoints
    .map((point) => ({
      point,
      diff: 180 - Math.abs(prevAngle - getAngle(currentPoint, point))
    }));

  const sorted = pointsWithDiff.sort((a, b) => a.diff - b.diff);
  const [closestPoint] = sorted;

  return closestPoint.point;
}

export default function * getPixels(newLine, ctx, width, height) {
  const findNeighbours = neighbourFinder(width, height);
  const isInPath = isPointInPath(ctx, width, height);

  const [ [x, y] ] = newLine;
  const points = [];
  const visited = {};
  const [lastX, lastY] = newLine[newLine.length - 1];

  let prevPoint;
  let point = [x, y];
  const distance = Math.ceil(ctx.lineWidth + 1) + 1; // + 1 for for loop

  while (point && point[0] !== lastX && point[1] !== lastY) {
    visited[`${point[0]}#${point[1]}`] = true;
    const neighbours = findNeighbours(...point);
    const possible = neighbours.filter((p) => !visited[`${p[0]}#${p[1]}`]);
    let nextPoints = possible.filter((p) => isInPath(point, p, distance)); // eslint-disable-line no-loop-func

    if (!nextPoints.length) {
      nextPoints = possible.filter((p) => isInPath(point, p, distance - 1)); // eslint-disable-line no-loop-func
    }

    const nextPoint = getNextPoint(prevPoint, point, nextPoints);

    prevPoint = point;
    point = nextPoint;
    if (nextPoint) {
      points.push(nextPoint);
      if (!nextPoint.length) {
        throw Error('ops');
      }
      yield nextPoint;
    }
  }

  if (!points.length) {
    throw Error('ops');
  }
  yield points;
}
