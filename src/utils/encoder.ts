import { compose } from './utils';

const toNumber = (x: string) => x.charCodeAt(0);
const encoder = (value: String) => value.split('').map(compose(encode, toNumber));

const highestDivisor = (a: number): number => {
    for (let i = Math.floor(a / 2); i >= 1; i--) {
        if(a % i === 0) {
            return i;
        }
    }
    return 1;
}

const encode = (value: number) => {
    // take in orders of 10, 5 and 1
    let a = highestDivisor(value);
    let b = value / a;
}


// TODO: LOGIC
// get gcd of all values
// make it the counter
// x5 for every iteration
// remainder is subtracted value
