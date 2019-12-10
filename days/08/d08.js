const { inputToLayers, decodeLayers } = require('./layers.js')
const { puzzleInput } = require('./puzzleInput.js')

const countOccurencesInString = (string, c) =>
    string.split('').filter(letter => letter === c).length

const layers = inputToLayers(puzzleInput, 25, 6)

const layersSorted = layers.slice().sort((a, b) => countOccurencesInString(a, '0') - countOccurencesInString(b, '0'))
const layerWithLeastZeros = layersSorted[0]

// part 1
console.log(countOccurencesInString(layerWithLeastZeros, "1") * countOccurencesInString(layerWithLeastZeros, "2"))

const output = decodeLayers(layers, 25, 6)

// part 2
for ( let i = 0; i < 6; i ++ ) {
    console.log(output.substring(i * 25, (i + 1) * 25).split('').map(c => c === '0' ? '█' : ' ').join(''))
}
