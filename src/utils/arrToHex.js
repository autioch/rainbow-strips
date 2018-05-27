const HEX = 16;

function componentToHex(component) {
  const hex = component.toString(HEX);

  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Converts [R,G,B] array color into hex representation.
 * @param  {Array} arr  Color to be converted to hex
 * @return {String}     Hex representation of the color.
 */
export default function arrToHex(arr) {
  const r = componentToHex(arr[0]);
  const g = componentToHex(arr[1]);
  const b = componentToHex(arr[2]);

  return `#${r}${g}${b}`;
}
