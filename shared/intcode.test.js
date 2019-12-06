const { intcode, convertToInstruction } = require('./intcode.js')

test('opcodes 1 and 2', () => {
    expect(intcode([1,0,0,0,99]).data[0]).toBe(2)
    expect(intcode([2,3,0,3,99]).data[3]).toBe(6)
    expect(intcode([2,4,4,5,99,0]).data[5]).toBe(9801)
    expect(intcode([1,1,1,4,99,5,6,0,99]).data[0]).toBe(30)
})

test('opcodes 3 and 4', () => {
    expect(intcode([3,0,4,0,99], 666).output[0]).toBe(666)
})

test('converting instructions', () => {
    expect(convertToInstruction(1002).opcode).toBe('2')
    expect(convertToInstruction(1002).modes[0]).toBe(0)
    expect(convertToInstruction(1002).modes[1]).toBe(1)
    expect(convertToInstruction(1002).modes[2]).toBe(0)

    expect(convertToInstruction(103).opcode).toBe('3')
    expect(convertToInstruction(103).modes.length).toBe(1)
    expect(convertToInstruction(103).modes[0]).toBe(1)

    expect(convertToInstruction(4).opcode).toBe('4')
    expect(convertToInstruction(4).modes.length).toBe(1)
    expect(convertToInstruction(4).modes[0]).toBe(0)

    expect(convertToInstruction(11111111111101).modes.length).toBe(3)
})

test('parameter modes', () => {
    expect(intcode([1002,4,3,4,33]).data[4]).toBe(99)
    expect(intcode([1101,100,-1,4,0]).data[4]).toBe(99)
})

test('position mode + opcode 8', () => {
    expect(intcode([3,9,8,9,10,9,4,9,99,-1,8], 8).output[0]).toBe(1)
})

test('position mode + opcode 7', () => {
    expect(intcode([3,9,7,9,10,9,4,9,99,-1,8], 7).output[0]).toBe(1)
})

test('immediate mode + opcode 8', () => {
    expect(intcode([3,3,1108,-1,8,3,4,3,99], 8).output[0]).toBe(1)
})

test('position mode + opcode 7', () => {
    expect(intcode([3,9,7,9,10,9,4,9,99,-1,8], 7).output[0]).toBe(1)
})

test('jump test 1', () => {
    expect(intcode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0).output[0]).toBe(0)
    expect(intcode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 77).output[0]).toBe(1)
})

test('jump test 2', () => {
    expect(intcode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0).output[0]).toBe(0)
    expect(intcode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 77).output[0]).toBe(1)
})

test.only('larger example', () => {
    const program = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]

    expect(intcode(program, 7).output[0]).toBe(999)
    expect(intcode(program, 8).output[0]).toBe(1000)
    expect(intcode(program, 9).output[0]).toBe(1001)
})
