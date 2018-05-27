/* eslint-disable no-magic-numbers */
/* eslint-disable max-nested-callbacks */
import { invalidAmount, examples } from './lerp.cases';
import { expect } from 'chai';
import lerp from '../lerp';

const serializeResult = (result) => result.join(',');

examples.forEach((testCase) => {
  testCase.serializedResult = serializeResult(testCase.result);
});

describe('lerp definition', () => {
  it('is a function', () => {
    expect(lerp).to.be.a('function');
  });

  it('accepts three arguments', () => {
    expect(lerp.length).to.be.equal(3);
  });
});

describe('lerp requires valid amount between 0 and 1', () => {
  invalidAmount.forEach((testCase) => {
    it(`throws when passed '${testCase.amount}'`, () => {
      expect(() => lerp(testCase.color1, testCase.color2, testCase.amount)).to.throw();
    });
  });
});

describe('lerp calculates color interpolation', () => {
  examples.forEach((testCase) => {
    it(`returns valid color`, () => {
      const result = lerp(testCase.color1, testCase.color2, testCase.amount);

      expect(serializeResult(result)).to.equal(testCase.serializedResult);
    });
  });
});
