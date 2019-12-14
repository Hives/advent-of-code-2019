const { calcOreForChemical } = require ('./d14p01.js')

test('1 ORE -> 1 FUEL', () => {
    const reactions = {
        "FUEL": [ { quant: 1, name: "ORE" } ]
    }
    expect(calcOreForChemical(reactions, "FUEL")).toBe(1)
})

test('2 ORE -> 1 FUEL', () => {
    const reactions = {
        "FUEL": [ { quant: 2, name: "ORE" } ]
    }
    expect(calcOreForChemical(reactions, "FUEL")).toBe(2)
})

test('simple chain of 3 chemicals', () => {
    const reactions = {
        "FUEL": [ { quant: 2, name: "A" } ],
        "A": [ { quant: 2, name: "ORE" } ],
    }
    expect(calcOreForChemical(reactions, "FUEL")).toBe(4)
})

test('simple chain of 4 chemicals', () => {
    const reactions = {
        "FUEL": [ { quant: 2, name: "A" } ],
        "A": [ { quant: 2, name: "B" } ],
        "B": [ { quant: 2, name: "ORE" } ],
    }
    expect(calcOreForChemical(reactions, "FUEL")).toBe(8)
})

test('FUEL made of two chemicals', () => {
    const reactions = {
        "FUEL": [
            { quant: 2, name: "A" },
            { quant: 1, name: "B" },
        ],
        "A": [ { quant: 3, name: "ORE" } ],
        "B": [ { quant: 4, name: "ORE" } ],
    }
    expect(calcOreForChemical(reactions, "FUEL")).toBe(10)
})
