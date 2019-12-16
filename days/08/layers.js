const inputToLayers = (input, width, height) => {
  const layers = [];

  let i = 0;
  while (i < input.length) {
    layers.push(input.substring(i, i + width * height));
    i += width * height;
  }
  return layers;
};

const decodeLayers = (layers, width, height) => {
  let output = '';

  for (let i = 0; i < width * height; i++) {
    let j = 0;
    while (layers[j][i] === '2') {
      j++;
    }
    output += layers[j][i];
  }

  return output;
};

module.exports = { inputToLayers, decodeLayers };
