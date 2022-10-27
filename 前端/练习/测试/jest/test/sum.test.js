const { sum } = require('../fn/sum')
test.only('adds 1 + 2 equal 3', () => {
  expect(sum(1, 3)).toBe(4)
})

test('this test will not run', () => {
  expect('A').toBe('A');
});

console.log(jest)