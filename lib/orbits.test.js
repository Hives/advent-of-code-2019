const {
    convertDataToOrbits,
    findSatellites,
    createOrbitTree,
    countChildren,
    countSubOrbits,
    getPathTo,
    orbitalTransferDistance,
} = require('./orbits.js')

const exampleData = [
    'COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
]

test('convert text to orbits', () => {
    const orbits = convertDataToOrbits(exampleData)
    expect(orbits[0].inner).toBe('COM')
    expect(orbits[10].outer).toBe('L')
})

test('find satellites', () => {
    const satellites = findSatellites('B', convertDataToOrbits(exampleData))
    const expectedSatellites = ['C', 'G']
    expect(satellites).toEqual(expectedSatellites)
})

test('empty orbit tree', () => {
    const data = convertDataToOrbits(['COM)A'])
    const output = createOrbitTree('A', data)
    const expectedOutput = {}
    expect(output).toEqual(expectedOutput)
})

test('create the simplest orbit tree', () => {
    const data = convertDataToOrbits(['COM)A'])
    const output = createOrbitTree('COM', data)
    const expectedOutput = { "A": {} }
    expect(output).toEqual(expectedOutput)
})

test('create the next simplest orbit tree', () => {
    const data = convertDataToOrbits(['COM)A', 'A)B'])
    const output = createOrbitTree('COM', data)
    const expectedOutput = { "A": { "B": {} } }
    expect(output).toEqual(expectedOutput)
})

test('create another orbit tree', () => {
    const data = convertDataToOrbits(['COM)A', 'A)B', 'B)C', 'A)D'])
    const output = createOrbitTree('A', data)
    const expectedOutput = { "B": { "C": {} }, "D": {} }
    expect(output).toEqual(expectedOutput)
})

test('create a more complex orbit tree', () => {
    const data = convertDataToOrbits(['COM)A', 'A)B', 'B)C', 'A)D'])
    const output = createOrbitTree('COM', data)
    const expectedOutput = { "A": { "B": { "C": {} }, "D": {} } }
    expect(output).toEqual(expectedOutput)
})

test('create orbit tree for example data', () => {
    const data = convertDataToOrbits(exampleData)
    const tree = { "COM": createOrbitTree('COM', data) }
    const expectedOutput = {
        "COM": {
            "B": {
                "G": {
                    "H": {}
                },
                "C": {
                    "D": {
                        "I": {},
                        "E": {
                            "J": {
                                "K": {
                                    "L": {}
                                }
                            },
                            "F": {}
                        }
                    }
                }
            }
        }
    }
    expect(tree).toEqual(expectedOutput)
})

test('count children of no star system', () => {
    const system = { "COM": {} }
    expect(countChildren(system['COM'])).toBe(0)
})

test('count children of one star system', () => {
    const system = { "COM": { "A": {} } }
    expect(countChildren(system['COM'])).toBe(1)
})

test('count children of two star system', () => {
    const system = { "COM": { "A": {}, "B": {} } }
    expect(countChildren(system['COM'])).toBe(2)
})

test('count children of one star one moon system', () => {
    const system = { "COM": { "A": { "B": {} } } }
    expect(countChildren(system['COM'])).toBe(2)
})

test('count children of example system', () => {
    const data = convertDataToOrbits(exampleData)
    const system = { "COM": createOrbitTree('COM', data) }
    expect(countChildren(system['COM'])).toBe(11)
})

test('count sub orbits of no star system', () => {
    const system = { "COM": {} }
    expect(countSubOrbits(system['COM'])).toBe(0)
})

test('count sub orbits of one star system', () => {
    const system = { "COM": { "A": {} } }
    expect(countSubOrbits(system['COM'])).toBe(1)
})

test('count sub orbits of one star one moon system', () => {
    const system = { "COM": { "A": { "B": {} } } }
    expect(countSubOrbits(system['COM'])).toBe(3)
})

test('count sub orbits of more complex system', () => {
    const system = { "COM": { "A": { "B": {}, "C": { "D": {}, "E": {} } } } }
    expect(countSubOrbits(system['COM'])).toBe(11)
})

test('count sub orbits of example system', () => {
    const data = convertDataToOrbits(exampleData)
    const system = { "COM": createOrbitTree('COM', data) }
    expect(countSubOrbits(system['COM'])).toBe(42)
})

test('get path in simple system', () => {
    const data = [ "COM)A", "A)B", "B)C" ]
    const orbitData = convertDataToOrbits(data)
    const path = getPathTo("C", orbitData)
    expect(path).toStrictEqual(["C", "B", "A", "COM"])
})

test('calc distance between two points from their paths', () => {
    const path1 = ["YOU", "K", "J", "E", "D", "C", "B", "COM"]
    const path2 = ["SAN", "I", "D", "C", "B", "COM"]
    expect(orbitalTransferDistance(path1, path2)).toBe(4)
})
