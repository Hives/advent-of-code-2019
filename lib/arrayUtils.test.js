const { total } = require('./arrayUtils.js')

test('adding numbers', () => {
    expect(total([])).toBe(0)
    expect(total([1])).toBe(1)
    expect(total([-1,10,1])).toBe(10)
})
