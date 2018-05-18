const { expect } = require('chai');
const moduleName = require('../src/index');

describe('moduleName', () => {
  it('is a function', () => {
    expect(moduleName).to.be.a('function');
  });

  it('accepts one argument', () => {
    expect(moduleName.length).to.be.equal(1);
  });
});
