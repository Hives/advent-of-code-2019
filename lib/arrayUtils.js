const total = (array) => array.reduce((a, b) => a + b, 0)

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

const max = (array) => array.reduce((a,b) => Math.max(a, b))

const lastElementOf = (array) => array[array.length - 1]

module.exports = { total, unique, max, lastElementOf }
