import _ from 'lodash';
import { compose } from './utils';

type Memory = {
    pos: number;
    stack: Uint8Array;
}

export const newMemory = (capacity: number = 30): Memory => ({
    pos: 0,
    stack: new Uint8Array(capacity, () => 0)
});

const validTokens = "[]<>+-.,".split('');
export const isValid = (x: string) => validTokens.includes(x);

const tokenize = (statements: String) => statements.split('');
const grammarCheck = (tokens: String[]) : String[] => tokens.filter(isValid)
const braceCheck = (tokens: String[]) => tokens.reduce((acc, x) => 
       acc + (x === '['
        ? 1 : x === ']' ? -1 : 0), 0) === 0
        ? tokens
        : [];

export const lexer = compose(braceCheck, grammarCheck, tokenize)

export const compile = (memory: Memory) => (tokens: String[]) => {
    let jumpStack = [];
    let stdout: String[] = [];
    for(let idx = 0; idx < tokens.length; idx++) {
        switch (tokens[idx]) {
            case '[': jumpStack.push(idx);
            break;
            case ']':
                memory.stack[memory.pos] === 0
                    ? jumpStack.pop()
                    : idx = _.last(jumpStack)
            break;
            case '+': memory.stack[memory.pos]++;
            break;
            case '-': memory.stack[memory.pos]--;
            break;
            case '>': memory.pos++;
            break;
            case '<': memory.pos--;
            break;
            case '.': stdout.push(String.fromCharCode(memory.stack[memory.pos]));
            break;
            case ',': memory.stack[memory.pos] = 97;    // FIX: handle individual input
            default: null
        }
    }
    return stdout.join('');
}
