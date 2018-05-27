function lerpComponent(h1, h2, amount) {
  return Math.floor(h1 + (amount * (h2 - h1)));
}

function assertValidAmount(amount) {
  if (!isFinite(amount) || isNaN(parseFloat(amount))) {
    throw Error(`Lerp amount must be a finite number, got ${amount}`);
  }

  if (amount > 1 || amount < 0) {
    throw Error(`Lerp amount must be between 0 and 1, got ${amount}`);
  }
}

/**
 * Interpolates 2 colors by a given amount
 * @param  {Array} color1      Starting color passed as an 3 element array with red, gree, blue.
 * @param  {Array} color2      Ending color passed as an 3 element array with red, gree, blue.
 * @param  {Number} amount     How much color1 should be blended to color2.
 *                             Decimal between 0 and 1, where 0 will produce color1, and 1 will produce color2.
 * @return {Array}             Interpolated color, in
 */
export default function lerp(color1, color2, amount) {
  assertValidAmount(amount);

  return [
    lerpComponent(color1[0], color2[0], amount),
    lerpComponent(color1[1], color2[1], amount),
    lerpComponent(color1[2], color2[2], amount)
  ];
}
