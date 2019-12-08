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

module.exports = { convertDataToOrbits, findSatellites, createOrbitTree, countChildren, countSubOrbits }
