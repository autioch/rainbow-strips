/* eslint-disable no-magic-numbers */

const invalidAmount = [
  {
    color1: [0, 0, 0],
    color2: [0, 0, 0],
    amount: null
  },
  {
    color1: [0, 0, 0],
    color2: [0, 0, 0],
    amount: -1
  },
  {
    color1: [0, 0, 0],
    color2: [0, 0, 0],
    amount: 1.1
  }
];

const examples = [
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 0,
    result: [0, 255, 0]
  },
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 1,
    result: [0, 0, 0]
  },
  {
    color1: [0, 255, 0],
    color2: [255, 0, 0],
    amount: 0.5,
    result: [127, 127, 0]
  }
];

export { invalidAmount, examples };
