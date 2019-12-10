const { puzzleInput } = require('./puzzleInput.js')
const { getOptimumThrusterSignal } = require('../../lib/feedback.js')

console.log(getOptimumThrusterSignal(puzzleInput))
