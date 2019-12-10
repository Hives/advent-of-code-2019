const { inputToLayers, decodeLayers } = require('./layers.js')

test('break example into layers', () => {
    const input = '0222112222120000'
    const layers = inputToLayers(input, 2, 2)
    expect(layers).toStrictEqual(['0222', '1122', '2212', '0000'])
})

test('decode example', () => {
    const input = '0222112222120000'
    const layers = inputToLayers(input, 2, 2)
    const output = decodeLayers(layers, 2, 2)
    expect(output).toBe('0110')
})
