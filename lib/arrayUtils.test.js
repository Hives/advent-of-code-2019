const { total, max } = require('./arrayUtils.js')

test('adding numbers', () => {
    expect(total([])).toBe(0)
    expect(total([1])).toBe(1)
    expect(total([-1,10,1])).toBe(10)
})

test('max', () => {
    expect(max([0,1,99,2,3])).toBe(99)
    expect(max([-9,-8,-4,-6])).toBe(-4)
})
