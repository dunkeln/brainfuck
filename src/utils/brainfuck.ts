import _ from 'lodash';
import { compose } from './utils';

type Memory = {
    pos: number;
    stack: Uint8Array;
}

const validTokens = "[]<>+-.,".split('');

const isValid = (x: string) => validTokens.includes(x);

const trimComments = (tokens: String[]) => _.takeWhile(tokens, (x: String) => x !== ',');
const grammarCheck = (tokens: String[]) : String[] => tokens.every(isValid)
    ? tokens
    : [];

const parseCheck = (tokens: String[]) => tokens.reduce((acc, x) => 
       acc + (x === '['
        ? 1 : x === ']' ? -1 : 0), 0) === 0
        ? tokens
        : [];

const trimString = (x: String): String[] => x.replace(/\s/g, '').split('');

export const lexer = compose(parseCheck, grammarCheck, trimComments, trimString)

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
            default: null
        }
    }
    return stdout.join('');
}
