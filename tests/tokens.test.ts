import { expect } from 'chai';
import { Word, tokenize } from '../src/tokens'

const LORUM_IPSUM_100 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin blandit non enim ac ultricies. Morbi commodo sem et urna sollicitudin, at lacinia diam luctus. Praesent maximus eleifend neque at tempor. Quisque commodo lectus turpis, lacinia sodales nulla auctor in. Sed hendrerit lectus a sollicitudin sollicitudin. Nullam hendrerit vel ante in mollis. Praesent tincidunt nulla lectus, nec egestas turpis gravida quis. Integer sagittis, magna eu vehicula euismod, nulla ante semper dolor, ac congue nibh magna ac nisl. Donec at accumsan turpis. Vestibulum ultricies sed leo vitae euismod. Integer suscipit non sem vel ullamcorper. Nullam eget diam tortor. Sed vel lacus sed.';

describe('Word', function() {
    const w = new Word("hello");

    it('has the correct value', function() {
        expect(w.value).to.equal('hello');
    });

    it('identifies itself as a word', function() {
        expect(w.kind).to.equal('word');
    })
});

describe('tokenize', function () {
   it('can tokenize a simple sentence.', function() {
      const tokens = tokenize('Hello world');
      expect(tokens[0].value).to.equal('Hello');
      expect(tokens[1].value).to.equal('world');
      expect(tokens[0].kind).to.equal('word');
      expect(tokens[1].kind).to.equal('word');
      expect(tokens.length).equals(2);
    });

   it('gets the correct number of tokens for LORUM_IPSUM_100', function() {
       const tokens = tokenize(LORUM_IPSUM_100);
       expect(tokens.length).equals(100);
   });
});