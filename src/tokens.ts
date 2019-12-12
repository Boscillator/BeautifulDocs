export class Word {
    readonly kind: string = 'word';

    constructor(readonly value: string, readonly forceNewLine: boolean) {
    }
}

export function tokenize(doc): Word[] {
    // God I can't wait to replace this code...
    const lines = doc.split(/\n/);
    let words = [];
    for(let line of lines) {
        line = line.split(/\s/);
        words = words.concat(
            line.
                slice(0, line.length - 1).
                map(w => new Word(w,false)));
        words.push(new Word(line[line.length - 1], true));
    }

    return words;
}
