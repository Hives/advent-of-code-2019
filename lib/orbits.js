const { total } = require('./arrayUtils.js')

const convertDataToOrbits = (data) => data
    .map(orbit => {
        const [inner, outer] = orbit.split(")")
        return { inner: inner, outer: outer}
    })

const findSatellites = (center, data) => data
    .filter(orbit => orbit.inner === center)
    .map(orbit => orbit.outer)

const createOrbitTree = (center, data) => {
    const satellites = findSatellites(center, data)
    const orbits = {}

    satellites.forEach(satellite =>
        orbits[satellite] = createOrbitTree(satellite, data)
    )

    return orbits
}

const countChildren = (tree) => Object.keys(tree).length +
    total(Object.keys(tree).map((key) => countChildren(tree[key])))

const countSubOrbits = (tree) => countChildren(tree) +
    total(Object.keys(tree).map((key) => countSubOrbits(tree[key])))

const getPathTo = (destination, orbitData) => {
    const path = [destination]
    let location = destination
    do {
        location = orbitData.find(orbit => orbit.outer === location).inner
        path.push(location)
    } while (location !== 'COM')
    return path
}

const orbitalTransferDistance = (p1, p2) => {
    const [ path1, path2 ] = [ p1.slice(), p2.slice() ]
    do {
        path1.pop()
        path2.pop()
    } while (path1[path1.length - 1] === path2[path2.length - 1])
    return path1.length + path2.length - 2
}

module.exports = {
    convertDataToOrbits,
    findSatellites,
    createOrbitTree,
    countChildren,
    countSubOrbits,
    getPathTo,
    orbitalTransferDistance,
}
