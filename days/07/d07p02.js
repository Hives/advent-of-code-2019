const { puzzleInput } = require('./puzzleInput.js')
const { getOptimumThrusterSignalWithFeedback } = require('../../lib/feedback.js')

console.log(getOptimumThrusterSignalWithFeedback(puzzleInput))
