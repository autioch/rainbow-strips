/* eselint-disable no-magic-numbers */
const testCases = require('./simplifyTestCases');
const { expect } = require('chai');
const simplifyLineRDP = require('../src/draw/simplifyLineRDP').default;

testCases.forEach((testCase) => {
  testCase.serializedOutput = JSON.stringify(testCase.output);
});

describe('simplifyLineRDP', () => {
  it('is a function', () => {
    expect(simplifyLineRDP).to.be.a('function');
  });

  it('accepts two arguments', () => {
    expect(simplifyLineRDP.length).to.be.equal(2);
  });
});

describe('simplifyLineRDP previous implementation', () => {
  testCases.forEach((testCase) => {
    it('provides results according to original implementation', () => {
      const result = simplifyLineRDP(testCase.input, 20);

      expect(JSON.stringify(result)).to.be.equal(testCase.serializedOutput);
    });
  });
});
