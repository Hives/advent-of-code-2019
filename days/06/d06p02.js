const { convertDataToOrbits, getPathTo, orbitalTransferDistance } = require('../../lib/orbits.js')
const { puzzleInput } = require('./puzzleInput.js')

const orbitData = convertDataToOrbits(puzzleInput)
const pathToSanta = getPathTo('SAN', orbitData)
const pathToYou = getPathTo('YOU', orbitData)
console.log(orbitalTransferDistance(pathToSanta, pathToYou))
