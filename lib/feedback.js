const { intcode } = require('./intcode.js')
const { unique, max, lastElementOf } = require('./arrayUtils.js')

const generatePhaseSequences = (add = 0) => {
    const sequences = []
    for ( let a = 0; a < 5; a++ ) {
        for ( let b = 0; b < 5; b++ ) {
            for ( let c = 0; c < 5; c++ ) {
                for ( let d = 0; d < 5; d++) {
                    for (let e = 0; e < 5; e++ ) {
                        sequences.push([a + add, b + add, c + add, d + add, e + add])
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

const getThrusterSignalWithFeedback = (inputProgram, phaseSequence) => {
    const program = inputProgram.slice()
    // console.log("inside getThrusterSignal2")
    const inputs = []
    phaseSequence.forEach(s => inputs.push([s]))
    inputs[0].push(0)
    // console.log(inputs)

    completionStates = [null, null, null, null, null]
    let amplifier = 0;
    // console.log('amplifier: ' + amplifier)

    let counter = 0

    do {
        // console.log("running program with inputs " + inputs[amplifier])
        const response = intcode(program, inputs[amplifier])
        // console.log(response)

        completionStates[amplifier] = response.status
        // console.log(completionStates)

        if (allStatesAreComplete(completionStates)) {
            // console.log("finishing!")
            return lastElementOf(response.output)
        }

        amplifier = (amplifier + 1) % 5
        // console.log("amplifier: " + amplifier)

        inputs[amplifier].push(lastElementOf(response.output))
        // console.log(inputs)

        counter++
        if (counter > 100) {
            console.log("too long?!")
            return -1
        }
    } while (true)

    // for ( let amplifier = 0; amplifier < 5; amplifier++ ) {
    //     output = intcode(program, [phaseSequence[amplifier], output]).output[0]
    // }
    // return output
}

const getOptimumThrusterSignalWithFeedback = (program) => {
    const sequences = generatePhaseSequences(5)
    const results = sequences.map(s => getThrusterSignalWithFeedback(program, s))
    return max(results)
}

const allStatesAreComplete = array => array.filter(unique).length === 1 &&
    array.filter(unique)[0] === 'COMPLETE'

module.exports = { getOptimumThrusterSignal, getOptimumThrusterSignalWithFeedback, getThrusterSignal, getThrusterSignalWithFeedback, generatePhaseSequences, allStatesAreComplete }
