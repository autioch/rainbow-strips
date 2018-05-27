export function sqr(x) {
  return x * x;
}

export function sqrt(x) {
  return Math.floor(Math.sqrt(x));
}

export function distance2d(p1, p2) {
  return sqrt(sqr(p1[0] - p2[0]) + sqr(p1[1] - p2[1]));
}

export function distance3d(p1, p2) {
  return sqrt(sqr(p1[0] - p2[0]) + sqr(p1[1] - p2[1]) + sqr(p1[2] - p2[2]));
}
