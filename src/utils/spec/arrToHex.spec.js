/* eslint-disable no-magic-numbers */
/* eslint-disable max-nested-callbacks */
import examples from './arrToHex.cases';
import { expect } from 'chai';
import arrToHex from '../arrToHex';

describe('arrToHex definition', () => {
  it('is a function', () => {
    expect(arrToHex).to.be.a('function');
  });

  it('accepts 1 argument', () => {
    expect(arrToHex.length).to.be.equal(1);
  });
});

describe('arrToHex calculates valid arrToHex array', () => {
  examples.forEach((testCase) => {
    it(`returns ${testCase.amount} proper colors`, () => {
      const result = arrToHex(testCase.input);

      expect(result).to.equal(testCase.output);
    });
  });
});
