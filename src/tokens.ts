
export class Word{
    readonly kind: string = 'word';

    constructor(readonly value: string) {
    }
}

export function tokenize(doc) {
    return doc.split(/\s/).map(w => new Word(w));
}
