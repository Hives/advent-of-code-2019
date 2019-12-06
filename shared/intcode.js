const digits = require('./digits.js')

const intcode = (program, input = null) => {
    let counter = 0;

    let pointer = 0;
    const output = [];
    const data = program.slice();

    while (data[pointer] !== 99) {
        // console.log("at the top")
        counter ++
        if (counter > 1000) throw 'this is taking a long time'
        if (pointer < 0) throw 'pointer was less than 0?!'
        if (pointer >= data.length) throw `pointer was too big: ${pointer}`

        // console.log('pointer: ' + pointer)
        // console.log('data: ' + data)
        // console.log('data[pointer]: ' + data[pointer])

        const instruction = convertToInstruction(data[pointer])
        // console.log(instruction)

        let value1
        let value2

        if (instruction.modes.length > 0) {
            if (instruction.modes[0] === 0) {
                value1 = data[data[pointer + 1]]
            } else if (instruction.modes[0] === 1) {
                value1 = data[pointer + 1]
            }
        }

        if (instruction.modes.length > 1) {
            if (instruction.modes[1] === 0) {
                value2 = data[data[pointer + 2]]
            } else if (instruction.modes[1] === 1) {
                value2 = data[pointer + 2]
            }
        }

        switch (instruction.opcode) {
            case '1':
                data[data[pointer + 3]] = value1 + value2;
                pointer += instruction.modes.length + 1;
                break;
            case '2':
                data[data[pointer + 3]] = value1 * value2;
                pointer += instruction.modes.length + 1;
                break;
            case '3':
                if (input === null) throw 'no input received';
                data[data[pointer + 1]] = input;
                pointer += instruction.modes.length + 1;
                break;
            case '4':
                output.push(value1);
                pointer += instruction.modes.length + 1;
                break;
            case '5':
                if (value1 !== 0) {
                    console.log('heading -> ' + value2)
                    pointer = value2
                } else {
                    pointer += instruction.modes.length + 1;
                }
                break;
            case '6':
                if (value1 === 0) {
                    pointer = value2
                } else {
                    pointer += instruction.modes.length + 1;
                }
                break;
            case '7':
                if (value1 < value2) {
                    data[data[pointer + 3]] = 1
                } else {
                    data[data[pointer + 3]] = 0
                }
                pointer += instruction.modes.length + 1;
                break;
            case '8':
                if (value1 === value2) {
                    data[data[pointer + 3]] = 1
                } else {
                    data[data[pointer + 3]] = 0
                }
                pointer += instruction.modes.length + 1;
                break;
            default:
                return ['uh-oh'];
                break;
        }

        // console.log("at the bottom")
        // console.log('pointer: ' + pointer)
        // console.log('data: ' + data)
        // console.log('data[pointer]: ' + data[pointer])

    }

    return { data: data, output: output }
}

const convertToInstruction = (input) => {
    const opcodeDetails = {
        '1': {
            numParams: 3,
        },
        '2': {
            numParams: 3,
        },
        '3': {
            numParams: 1,
        },
        '4': {
            numParams: 1,
        },
        '5': {
            numParams: 2,
        },
        '6': {
            numParams: 2,
        },
        '7': {
            numParams: 3,
        },
        '8': {
            numParams: 3,
        },
        '99': {
            numParams: 0,
        },
    }

    const opcode = `${input % 100}`
    const remainder = Math.floor(input / 100)
    const modes= digits(remainder).reverse()

    for ( let i = 0; i < opcodeDetails[opcode].numParams; i++ ) {
        if (!modes[i]) {
            modes[i] = 0;
        }
    }

    return { opcode, modes: modes.slice(0, opcodeDetails[opcode].numParams) }
}

module.exports = { intcode, convertToInstruction }
