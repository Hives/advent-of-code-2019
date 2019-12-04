const puzzleInput = [1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,13,1,19,1,9,19,23,2,23,13,27,1,27,9,31,2,31,6,35,1,5,35,39,1,10,39,43,2,43,6,47,1,10,47,51,2,6,51,55,1,5,55,59,1,59,9,63,1,13,63,67,2,6,67,71,1,5,71,75,2,6,75,79,2,79,6,83,1,13,83,87,1,9,87,91,1,9,91,95,1,5,95,99,1,5,99,103,2,13,103,107,1,6,107,111,1,9,111,115,2,6,115,119,1,13,119,123,1,123,6,127,1,127,5,131,2,10,131,135,2,135,10,139,1,13,139,143,1,10,143,147,1,2,147,151,1,6,151,0,99,2,14,0,0];

const run = (input, noun, verb) => {
    let data = Array.from(input);
    data.splice(1, 1, noun);
    data.splice(2, 1, verb);

    let pointer = 0;

    while (data[pointer] !== 99) {
        let newValue;
        const value1 = data[data[pointer + 1]];
        const value2 = data[data[pointer + 2]];

        if (data[pointer] === 1) {
            newValue = value1 + value2;
        }
        if (data[pointer] === 2) {
            newValue = value1 * value2;
        }

        data[data[pointer + 3]] = newValue;
        pointer += 4;
    }

    return data[0];
}

for (let noun = 0; noun < 100; noun++) {
    for (let verb = 0; verb < 100; verb++) {
        if (run(puzzleInput, noun, verb) === 19690720) {
            console.log(100 * noun + verb);
            return;
        }
    }
}
