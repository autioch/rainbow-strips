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
  },
  {
    color1: [0, 0, 0],
    color2: [0, 0, 0],
    amount: Infinity
  },
  {
    color1: [0, 0, 0],
    color2: [0, 0, 0],
    amount: 3.5
  }
];

const examples = [
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 2,
    result: [ [0, 255, 0], [0, 0, 0] ]
  },
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 3,
    result: [ [0, 255, 0], [0, 127, 0], [0, 0, 0] ]
  },
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 4,
    result: [ [0, 255, 0], [0, 170, 0], [0, 85, 0], [0, 0, 0] ]
  },
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 5,
    result: [ [0, 255, 0], [0, 191, 0], [0, 127, 0], [0, 63, 0], [0, 0, 0] ]
  },
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 6,
    result: [ [0, 255, 0], [0, 204, 0], [0, 153, 0], [0, 101, 0], [0, 51, 0], [0, 0, 0] ]
  },
  {
    color1: [0, 255, 0],
    color2: [0, 0, 0],
    amount: 7,
    result: [ [0, 255, 0], [0, 212, 0], [0, 170, 0], [0, 127, 0], [0, 85, 0], [0, 42, 0], [0, 0, 0] ]
  }, {
    color1: [255, 0, 0],
    color2: [0, 255, 0],
    amount: 3,
    result: [ [255, 0, 0], [127, 127, 0], [0, 255, 0] ]
  }
];

export { invalidAmount, examples };
