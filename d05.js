const digits = n => {
    let temp = n
    const output = []

    while (temp > 0) {
        d = temp % 10
        temp = Math.trunc(temp/10)
        output.push(d)
    }

    return output.reverse()
}

const run = (input) => {
    let pointer = 0;
    let data = input;

    while (data[pointer] !== 99) {
        let newValue;
        const value1 = data[data[pointer + 1]];
        const value2 = data[data[pointer + 2]];

        if (data[pointer] === 1) {
            newValue = value1 + value2;
            pointer += 4;
        }
        if (data[pointer] === 2) {
            newValue = value1 * value2;
            pointer += 4;
        }
        if (data[pointer] === 3 ) {

        }
        if (data[pointer] === 4 ) {

        }

        data[data[pointer + 3]] = newValue;
    }

    return data
}

console.log(run([1,0,0,0,99]));
console.log(run([2,3,0,3,99]));
console.log(run([2,4,4,5,99,0]));
console.log(run([1,1,1,4,99,5,6,0,99]));
console.log(run(puzzleInput));

