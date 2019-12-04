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

const aPairOfDigitsExists = n => {
    const d = digits(n);
    for ( let i = 0; i < d.length - 1; i++ ) {
        if (d[i] === d[i + 1]) {
            if (((!d[i - 1] || d[i - 1] !== d[i]) &&
                (!d[i + 2] || d[i + 2] !== d[i]))) {
                return true;
            }
        }
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
    if (aPairOfDigitsExists(n) && digitsNeverDecrease(n)) count ++
}
console.log(count)
