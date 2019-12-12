import {Word} from './tokens';

export class LayedOutWord extends Word {
    hasNewLine: boolean;
    constructor(hasNewLine: boolean, parent: Word) {
        super(parent.value);
        this.hasNewLine = hasNewLine;
    }
}

export enum WeightFunction {
    Linear,
    Quadratic,
    Cubic
}

export interface LayoutConfig {
    maxLineLength: number,
    idealLineLength: number,
    jaggednessWeightingFunction: WeightFunction
}

interface LineBreak {
    previousIdx: number
    score: number
}

function getLineWidth(s: string) {
    // Eventually this function will return size of the line given the font and stuff
    // right now it just returns the length in characters
    return s.length;
}

function getWidthOfSpan(doc: Word[], i: number, j: number) {
    return getLineWidth(doc.slice(i,j).map(t => t.value).join(' '));
}


function score(i: number, j: number, doc: Word[], config: LayoutConfig) {
    const len = getWidthOfSpan(doc, i, j);
    if(len > config.maxLineLength) {
        return Infinity;
    }

    let dif = Math.abs(len - config.idealLineLength);
    switch(config.jaggednessWeightingFunction) {
        case WeightFunction.Linear:
            return dif;
        case WeightFunction.Quadratic:
            return dif**2;
        case WeightFunction.Cubic:
            return dif**3;
    }
}

export function debugLayoutString(doc: LayedOutWord[]) {
    return doc.reduce((buf, w) => {
        return buf +  w.value + (w.hasNewLine ? '\n' : ' ');
    }, "");
}

export function knuthAndPlass(doc: Word[], config: LayoutConfig) {
    // Create a scores array
    let lineBreaks: LineBreak[] = doc.map(_ => ({
        previousIdx: 0,
        score: 0
    }));

    // Use dynamic programing to find an optimal solution by calculating the score if a newline was forced after word `j`
    for(let j = 0; j < doc.length; j++) {
        if( j === 0) {
            continue;
        }

        let bestScore = Infinity;
        let bestIdx = null;
        for(let i = 0; i < j; i++) {
            let myScore = lineBreaks[i].score + score(i, j, doc, config);
            if(myScore < bestScore) {
                bestScore = myScore;
                bestIdx = i;
            }
        }

        lineBreaks[j] = {
            previousIdx: bestIdx,
            score: bestScore
        };
    }


    // Knowing there must be a newline after the last word, backtrack the optimal solution.
    let layedOut = doc.map(w => new LayedOutWord(false, w));
    let lineBreakIdx = lineBreaks.length - 1;
    while(lineBreakIdx !== 0) {
        layedOut[lineBreakIdx].hasNewLine = true;
        lineBreakIdx = lineBreaks[lineBreakIdx].previousIdx;
    }

    return layedOut;
}