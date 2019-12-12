import {Word} from './tokens';

export class LayedOutWord extends Word {
    hasNewLine: boolean;
    constructor(hasNewLine: boolean, parent: Word) {
        super(parent.value, parent.forceNewLine);
        this.hasNewLine = hasNewLine;
    }
}

function assertUnreachable(_v: never): never {
    throw new Error("Didn't expect to get here.")
}

export enum WeightFunction {
    Linear,
    Quadratic,
    Cubic,
    Exponential
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


function weightFunction(f: WeightFunction, v) {
    switch (f) {
        case WeightFunction.Linear:
            return v;
        case WeightFunction.Quadratic:
            return v ** 2;
        case WeightFunction.Cubic:
            return v ** 3;
        case WeightFunction.Exponential:
            return Math.exp(v);
    }
    return assertUnreachable(f);
}

function scoreLine(i: number, j: number, doc: Word[], config: LayoutConfig) {
    const len = getWidthOfSpan(doc, i, j);
    if(len > config.maxLineLength) {
        return Infinity;
    }

    let dif = 0;
    if(doc[j].forceNewLine) {
        //Only score positive jaggedness for last line in paragraph.
        dif = Math.max(0, len - config.idealLineLength);
    }
    else {
        dif = Math.abs(len - config.idealLineLength);
    }

    return weightFunction(config.jaggednessWeightingFunction, dif);
}

export function debugLayoutString(doc: LayedOutWord[]) {
    return doc.reduce((buf, w) => {
        let ender = ' ';
        if (w.forceNewLine) {
            ender = '\n\n';
        }
        else if (w.hasNewLine) {
            ender = '\n';
        }
        return buf +  w.value + ender;
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
        for(let i = j - 1; i >= 0; i--) {
            let myScore = lineBreaks[i].score + scoreLine(i, j, doc, config);
            if(myScore < bestScore) {
                bestScore = myScore;
                bestIdx = i;
            }

            if(doc[i].forceNewLine) {
                // Don't go searching beyond a known newline
                break;
            }
        }

        lineBreaks[j] = {
            previousIdx: bestIdx,
            score: bestScore
        };
    }


    // Knowing there must be a newline after the last word, backtrack the optimal solution.
    let layedOut = doc.map(w => new LayedOutWord(w.forceNewLine, w));
    let lineBreakIdx = lineBreaks.length - 1;
    while(lineBreakIdx !== 0) {
        layedOut[lineBreakIdx].hasNewLine = true;
        lineBreakIdx = lineBreaks[lineBreakIdx].previousIdx;
    }

    return layedOut;
}