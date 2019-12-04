const digits = n => {
    let temp = n
    const output = []

    while (temp > 0) {
        d = temp % 10
        temp -= d
        temp /= 10
        output.push(d)
    }

    return output.reverse()
}

const twoAdjacentDigitsAreTheSame = n => {
    const d = digits(n)
    for ( let i = 0; i < d.length - 1; i++ ) {
        if (d[i] === d[i + 1]) return true
    }
    return false
}

const digitsNeverDecrease = n => {
    const d = digits(n)
    for ( let i = 0; i < d.length - 1; i++ ) {
        if (d[i + 1] < d[i]) return false
    }
    return true
}

let count = 0
for ( let n = 109165; n <= 576723; n++ ) {
    if (twoAdjacentDigitsAreTheSame(n) && digitsNeverDecrease(n)) count ++
}

console.log(count)
