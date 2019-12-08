const { convertDataToOrbits, createOrbitTree, countSubOrbits } = require('../../lib/orbits.js')
const { puzzleInput } = require('./puzzleInput.js')

const orbitData = convertDataToOrbits(puzzleInput)
const system = { "COM": createOrbitTree('COM', orbitData) }
console.log(countSubOrbits(system['COM']))
