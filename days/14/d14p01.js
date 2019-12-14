/*
 *  {
 *      "FUEL": [
 *          {
 *              quant: 2,
 *              name: "A",
 *          },
 *          {
 *              quant: 3,
 *              name: "B",
 *          },
 *      ],
 *      "A": [
 *          {
 *              quant: 3,
 *              name: "ORE",
 *          }
 *      ],
 *      "B": [
 *          {
 *              quant: 2,
 *              name: "ORE",
 *          }
 *      ]
 *  }
 */

const calcOreForChemical = (reactions, chemical) => {
    inputs = reactions[chemical]

    const output = inputs.reduce((acc, input) => {
        const ore = (input.name === "ORE") ?
            input.quant :
            input.quant * calcOreForChemical(reactions, input.name)
        return acc + ore
    }, 0)

    return output
}

module.exports = { calcOreForChemical }
