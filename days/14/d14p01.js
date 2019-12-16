/*  {
 *    FUEL: 1
 *  }
 */

const { unique } = require('../../lib/arrayUtils.js');
const { puzzleInput } = require('./puzzleInput.js');

const translateSingleLine = line => {
  if (line === '') return {};
  const [ingredients, product] = line.split(' => ');
  const foo = { name: product.split(' ')[1], quant: product.split(' ')[0] };
  const stuffs = ingredients
    .split(', ')
    .map(i => {
      const [quant, name] = i.split(' ');
      const output = {};
      output[name] = parseInt(quant);
      return output;
    })
    .reduce((acc, quantityOfIngredient) => {
      return { ...acc, ...quantityOfIngredient };
    }, {});
  const output = {};
  output[foo.name] = { ...stuffs };
  output[foo.name][foo.name] = -foo.quant;
  return output;
};

const translateMultipleLines = lines =>
  lines
    .split('\n')
    .map(line => translateSingleLine(line))
    .reduce((acc, reaction) => {
      return { ...acc, ...reaction };
    }, {});

const removeZeroKeys = input => {
  const o = Object.assign({}, input);
  Object.keys(o).forEach(key => {
    if (o[key] === 0) delete o[key];
  });
  return o;
};

const addProducts = (product1, product2) => {
  const output = {};
  Object.keys(product1)
    .concat(Object.keys(product2))
    .filter(unique)
    .forEach(key => {
      output[key] = (product1[key] || 0) + (product2[key] || 0);
    });
  return removeZeroKeys(output);
};

const multiplyProducts = (products, multiplier) => {
  const output = {};
  Object.keys(products).forEach(key => {
    output[key] = products[key] * multiplier;
  });
  return output;
};

const deductAvailableRemainders = params => {
  const { ingredients: oldIngredients, remainders: oldRemainders } = params;
  const ingredients = {};
  const adjustedRemainders = {};
  Object.keys(oldIngredients).forEach(key => {
    if (oldIngredients[key] > 0 && oldRemainders[key]) {
      const useableRemainder = Math.min(
        oldIngredients[key],
        oldRemainders[key],
      );
      ingredients[key] = oldIngredients[key] - useableRemainder;
      adjustedRemainders[key] = oldRemainders[key] - useableRemainder;
    } else {
      ingredients[key] = oldIngredients[key];
    }
  });

  return {
    ingredients: removeZeroKeys(ingredients),
    remainders: removeZeroKeys({ ...oldRemainders, ...adjustedRemainders }),
  };
};

const substituteProduct = params => {
  const {
    products,
    reactions,
    target,
    remainders: oldRemainders = {},
  } = params;

  // const remainders = Object.assign({}, oldRemainders);

  const numberOfReactionsRequired = Math.ceil(
    Math.abs(products[target] / reactions[target][target]),
  );

  const ingredientsRequired = multiplyProducts(
    reactions[target],
    numberOfReactionsRequired,
  );

  const {
    ingredients: adjustedIngredients,
    remainders,
  } = deductAvailableRemainders({
    ingredients: ingredientsRequired,
    remainders: oldRemainders,
  });

  const newProducts = addProducts(products, adjustedIngredients);

  const remainderFromThisReaction = {};
  remainderFromThisReaction[target] = Math.abs(Math.min(newProducts[target]));

  return {
    products: addProducts(newProducts, remainderFromThisReaction),
    remainders: addProducts(remainders, remainderFromThisReaction),
  };
};

const reduce = params => {
  const { products, reactions, remainders } = params;
  const target = Object.keys(products).filter(key => key !== 'ORE')[0];
  return substituteProduct({
    reactions,
    products,
    remainders,
    target,
  });
};

const calcOre = (input, quantityOfFuel = 1) => {
  const reactions = translateMultipleLines(input);
  const data = {
    products: { FUEL: quantityOfFuel, ORE: 0 },
    remainders: {},
  };
  while (Object.keys(data.products).length > 1) {
    const reduced = reduce({
      products: data.products,
      reactions,
      remainders: data.remainders,
    });
    data.products = reduced.products;
    data.remainders = reduced.remainders;
  }
  return data.products['ORE'];
};

console.log(calcOre(puzzleInput));

module.exports = {
  translateSingleLine,
  translateMultipleLines,
  substituteProduct,
  addProducts,
  multiplyProducts,
  deductAvailableRemainders,
  removeZeroKeys,
  reduce,
  calcOre,
};
