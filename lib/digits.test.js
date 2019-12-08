const digits = require('./digits.js')

test('correct digits for 123', () => {
    const output = digits(789)
    expect(output[0]).toBe(7)
    expect(output[1]).toBe(8)
    expect(output[2]).toBe(9)
})
