const { fetchData, asyncData } = require('../fn/fetchData')
const { isCity } = require('../fn/city')
test('the data is peanut butter', done => {
  function cb(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (err) {
      done(err)
    }
  }
  fetchData(cb)
})

test('async data is peanut butter', async () => {
  const data = await asyncData();
  return expect(data).toBe('peanut butter')
})

test('async resolve data is peanut butter', () => {
  return expect(asyncData()).resolves.toBe('peanut butter')
})


describe('city database has Vienna', () => {
  test('city includes Vienna is true', () => {
    expect(isCity('Vienna')).toBeTruthy()
  })
})