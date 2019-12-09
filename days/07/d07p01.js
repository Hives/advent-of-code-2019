const { puzzleInput } = require('./puzzleInput.js')
const { intcode } = require('../../lib/intcode.js')
const { unique, max } = require('../../lib/arrayUtils.js')

const generatePhaseSequences = () => {
    const sequences = []
    for ( let a = 0; a < 5; a++ ) {
        for ( let b = 0; b < 5; b++ ) {
            for ( let c = 0; c < 5; c++ ) {
                for ( let d = 0; d < 5; d++) {
                    for (let e = 0; e < 5; e++ ) {
                        sequences.push([a,b,c,d,e])
                    }
                }
            }
        }
    }
    return sequences.filter(s => s.filter(unique).length === 5)
}

const getOptimumThrusterSignal = (program) => {
    const sequences = generatePhaseSequences()
    const results = sequences.map(s => getThrusterSignal(program, s))
    return max(results)
}

const getThrusterSignal = (program, phaseSequence) => {
    let output = 0
    for ( let amplifier = 0; amplifier < 5; amplifier++ ) {
        output = intcode(program, [phaseSequence[amplifier], output]).output[0]
    }
    return output
}

console.log(getOptimumThrusterSignal(puzzleInput))

module.exports = { getOptimumThrusterSignal, getThrusterSignal }
