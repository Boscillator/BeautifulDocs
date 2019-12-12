import {debugLayoutString, knuthAndPlass, WeightFunction} from "./layout";
import {tokenize} from "./tokens";
import {LORUM_IPSUM_5_P} from "../tests/data";

const tokens = tokenize(LORUM_IPSUM_5_P);
const layedOut = knuthAndPlass(tokens, {
    maxLineLength: 200,
    idealLineLength: 150,
    jaggednessWeightingFunction: WeightFunction.Cubic
});
console.log(debugLayoutString(layedOut));
