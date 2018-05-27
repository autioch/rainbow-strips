/* eslint-disable no-magic-numbers */
/* eslint-disable max-nested-callbacks */
import { invalidAmount, examples } from './gradient.cases';
import { expect } from 'chai';
import gradient from '../gradient';

const serializeResult = (result) => result.map((color) => color.join(',')).join(';');

examples.forEach((testCase) => {
  testCase.serializedResult = serializeResult(testCase.result);
});

describe('gradient definition', () => {
  it('is a function', () => {
    expect(gradient).to.be.a('function');
  });

  it('accepts three arguments', () => {
    expect(gradient.length).to.be.equal(3);
  });
});

describe('gradient requires valid amount', () => {
  invalidAmount.forEach((testCase) => {
    it(`throws when passed '${testCase.amount}'`, () => {
      expect(() => gradient(testCase.color1, testCase.color2, testCase.amount)).to.throw();
    });
  });
});

describe('gradient calculates valid gradient array', () => {
  examples.forEach((testCase) => {
    it(`returns ${testCase.amount} proper colors`, () => {
      const result = gradient(testCase.color1, testCase.color2, testCase.amount);

      expect(serializeResult(result)).to.equal(testCase.serializedResult);
    });
  });
});
