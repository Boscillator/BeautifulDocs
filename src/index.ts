import {debugLayoutString, knuthAndPlass, WeightFunction} from "./layout";
import {tokenize} from "./tokens";

const LORUM_IPSUM_100 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit non enim ac ultricies. Morbi commodo sem et urna sollicitudin, at lacinia diam luctus. Praesent maximus eleifend neque at tempor. Quisque commodo lectus turpis, lacinia sodales nulla auctor in. Sed hendrerit lectus a sollicitudin sollicitudin. Nullam hendrerit vel ante in mollis. Praesent tincidunt nulla lectus, nec egestas turpis gravida quis. Integer sagittis, magna eu vehicula euismod, nulla ante semper dolor, ac congue nibh magna ac nisl. Donec at accumsan turpis. Vestibulum ultricies sed leo vitae euismod. Integer suscipit non sem vel ullamcorper. Nullam eget diam tortor. Sed vel lacus sed.';
const tokens = tokenize(LORUM_IPSUM_100);
const layedOut = knuthAndPlass(tokens, {
    maxLineLength: 200,
    idealLineLength: 150,
    jaggednessWeightingFunction: WeightFunction.Cubic
});
console.log(debugLayoutString(layedOut));
