/* eslint-disable no-magic-numbers */
const testCases = require('./smoothLineCases');
const { expect } = require('chai');
const smoothLine = require('../src/draw/smoothLine').default;

testCases.forEach((testCase) => {
  testCase.serializedOutput = JSON.stringify(testCase.output);
});

describe('smoothLine', () => {
  it('is a function', () => {
    expect(smoothLine).to.be.a('function');
  });

  it('accepts two arguments', () => {
    expect(smoothLine.length).to.be.equal(3);
  });
});

describe('smoothLine previous implementation', () => {
  testCases.forEach((testCase) => {
    it('provides results according to original implementation', () => {
      const result = smoothLine(testCase.input, 20);

      expect(JSON.stringify(result)).to.be.equal(testCase.serializedOutput);
    });
  });
});
