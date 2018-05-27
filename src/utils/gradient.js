import lerp from './lerp';
import { distance3d } from './math';

function asserValidAmount(amount) {
  if (!Number.isInteger(amount)) {
    throw Error(`Gradient amount must be an integer, got ${amount}`);
  }

  if (amount < 2 || !isFinite(amount)) {
    throw Error(`Gradient amount must be between 2 and Infinity, got ${amount}`);
  }
}

/**
 * Generates specified amount of colors between 2 provided colors.
 * Provided colors are included in the array, as the first and last color.
 * @param  {Array} color1   Color from which gradient starts.
 * @param  {Array} color2   Color at which gradient ends.
 * @param  {Integer} amount How many colors should be returned.
 * @return {Array}        [description]
 */
export default function gradient(color1, color2, amount) {
  asserValidAmount(amount);
  const colorDistance = distance3d(color1, color2);
  const actualAmount = amount - 1;
  const step = colorDistance / (actualAmount * colorDistance);

  const colors = [color1];

  for (let i = 1; i < actualAmount; i++) {
    colors.push(lerp(color1, color2, step * i));
  }

  colors.push(color2);

  return colors;
}
