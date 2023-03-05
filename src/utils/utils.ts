

export const compose = (...funcs: Function[]) => (x: unknown) =>
    funcs.reduceRight((acc, func) => func(acc), x);
