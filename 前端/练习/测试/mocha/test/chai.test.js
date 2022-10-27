const expect = require('chai').expect

describe('这是一个测试', function () {
  it('测试用例', function () {
    const foo = 'bar'
      , beverages = { tea: ['chai', 'matcha', 'oolong'] };

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.lengthOf(3);
    expect(beverages).to.have.property('tea').with.lengthOf(3);
  })
})