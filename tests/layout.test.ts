import { expect } from 'chai';
import {LORUM_IPSUM_100} from "./data";
import {debugLayoutString, knuthAndPlass, WeightFunction} from "../src/layout";
import {tokenize} from "../src/tokens";

describe('layout', function () {
    const tokens = tokenize(LORUM_IPSUM_100);
    const result = knuthAndPlass(tokens, {
        maxLineLength: 200,
        idealLineLength: 150,
        jaggednessWeightingFunction: WeightFunction.Cubic
    });
    const debug = debugLayoutString(result);

    it('should never exceed the maximum line length.', function() {
        debug.split('\n').forEach(line => {
            expect(line.length).lessThan(201);
        });
    });
});
