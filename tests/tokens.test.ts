import {expect} from 'chai';
import {Word, tokenize} from '../src/tokens'
import {LORUM_IPSUM_100, LORUM_IPSUM_5_P} from './data'


describe('Word', function () {
    const w = new Word("hello", false);

    it('has the correct value', function () {
        expect(w.value).to.equal('hello');
    });

    it('identifies itself as a word', function () {
        expect(w.kind).to.equal('word');
    })
});

describe('tokenize', function () {
    it('can tokenize a simple sentence.', function () {
        const tokens = tokenize('Hello world');
        expect(tokens[0].value).to.equal('Hello');
        expect(tokens[1].value).to.equal('world');
        expect(tokens[0].kind).to.equal('word');
        expect(tokens[1].kind).to.equal('word');
        expect(tokens[0].forceNewLine).to.equals(false);
        expect(tokens[1].forceNewLine).to.equals(true);
        expect(tokens.length).equals(2);
    });

    it('gets the correct number of tokens for LORUM_IPSUM_100', function () {
        const tokens = tokenize(LORUM_IPSUM_100);
        expect(tokens.length).equals(100);
    });

    it('gets the correct number of newlines in LORUM_IPSUM_5_P', function() {
        const tokens = tokenize(LORUM_IPSUM_5_P);
        const newLinesTokens = tokens.filter(t => t.forceNewLine);
        expect(newLinesTokens.length).equals(5);
    });
});