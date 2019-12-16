const {
  translateSingleLine,
  translateMultipleLines,
  addProducts,
  multiplyProducts,
  deductAvailableRemainders,
  substituteProduct,
  removeZeroKeys,
  reduce,
  calcOre,
} = require('./d14p01.js');

const { examples } = require('./puzzleInput.js');

test('translate empty line', () => {
  expect(translateSingleLine('')).toEqual({});
});

test('translate single line', () => {
  line = '20 JVDKQ, 2 LSQFK, 8 SDNCK, 1 MQJNV, 13 LBTV, 3 KPBRX => 5 QBPC';
  expect(translateSingleLine(line)).toEqual({
    QBPC: {
      JVDKQ: 20,
      LSQFK: 2,
      SDNCK: 8,
      MQJNV: 1,
      LBTV: 13,
      KPBRX: 3,
      QBPC: -5,
    },
  });
});

test('translate multiple lines', () => {
  lines = `
1 ZQVND => 2 MBZM
2 KZCVX, 1 SZBQ => 7 HQFB
`;

  expect(translateMultipleLines(lines)).toEqual({
    MBZM: {
      ZQVND: 1,
      MBZM: -2,
    },
    HQFB: {
      KZCVX: 2,
      SZBQ: 1,
      HQFB: -7,
    },
  });
});

test('remove zero keys', () => {
  expect(removeZeroKeys({ A: 0 })).toEqual({});
  expect(removeZeroKeys({ A: 0, B: 1 })).toEqual({ B: 1 });
  expect(removeZeroKeys({ B: 1 })).toEqual({ B: 1 });
});

test('add two products objects', () => {
  p1 = { A: 1, B: 20, C: 30 };
  p2 = { A: -1, B: 12 };
  expect(addProducts(p1, p2)).toEqual({ B: 32, C: 30 });
});

test('multiply products object by an integer', () => {
  p = { A: 1, B: 20, C: -30 };
  expect(multiplyProducts(p, 3)).toEqual({ A: 3, B: 60, C: -90 });
});

test('substitute product for ingredients', () => {
  const output = substituteProduct({
    reactions: { A: { A: -1, B: 2 } },
    products: { A: 6, B: 6, C: 3 },
    target: 'A',
  });

  expect(output.products).toEqual({ B: 18, C: 3 });
  expect(output.remainders).toEqual({});
});

test('deduct available remainders', () => {
  const output = deductAvailableRemainders({
    ingredients: { A: 3, B: 5, C: 10 },
    remainders: { A: 5, B: 2 },
  });
  // console.log(output);
  expect(output.ingredients).toEqual({ B: 3, C: 10 });
  expect(output.remainders).toEqual({ A: 2 });
});

test('substitute product for ingredients, reaction produces > 1', () => {
  const output = substituteProduct({
    reactions: { A: { A: -2, B: 2 } },
    products: { A: 6, B: 6, C: 3 },
    target: 'A',
  });

  expect(output.products).toEqual({ B: 12, C: 3 });
  expect(output.remainders).toEqual({});
});

test('substitute product for ingredients, reaction produces a remainder', () => {
  const output = substituteProduct({
    reactions: { A: { A: -5, B: 2 } },
    products: { A: 6, B: 6, C: 3 },
    target: 'A',
  });

  expect(output.products).toEqual({ B: 10, C: 3 });
  expect(output.remainders).toEqual({ A: 4 });
});

test('substitute product for ingredients, contribution from existing remainder', () => {
  const output = substituteProduct({
    reactions: { A: { A: -1, B: 5 } },
    products: { A: 5, B: 6, C: 3 },
    remainders: { B: 5 },
    target: 'A',
  });

  expect(output.products).toEqual({ B: 26, C: 3 });
  expect(output.remainders).toEqual({});
});

test('substitute product for ingredients, remainder shenanigens', () => {
  const output = substituteProduct({
    reactions: { A: { A: -4, B: 5 } },
    products: { A: 5, B: 6, C: 3 },
    remainders: { A: 2, B: 5 },
    target: 'A',
  });

  expect(output.products).toEqual({ B: 11, C: 3 });
  expect(output.remainders).toEqual({ A: 5 });
});

test('reduce simple example', () => {
  const output = reduce({
    products: { A: 3, B: 2 },
    reactions: { A: { A: -1, C: 5 } },
    remainders: {},
  });
  expect(output.products).toEqual({ B: 2, C: 15 });
});

test('first example', () => {
  expect(calcOre(examples[0])).toBe(31);
});

test('second example', () => {
  expect(calcOre(examples[1])).toBe(165);
});

test('third example', () => {
  expect(calcOre(examples[2])).toBe(13312);
});

test('fourth example', () => {
  expect(calcOre(examples[3])).toBe(180697);
});

test('fifth example', () => {
  expect(calcOre(examples[4])).toBe(2210736);
});
