export abstract class Token {
    abstract readonly kind: string;
}

export class Word extends Token {
    readonly kind: string = 'word';

    constructor(readonly value: string) {
        super();
    }
}

export function tokenize(doc) {
    return doc.split(/\s/).map(w => new Word(w));
}
