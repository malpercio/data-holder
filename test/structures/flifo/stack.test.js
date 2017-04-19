'use strict';
let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let Stack = require('../../../index.js')('Sync','Stack');

let genericTests = require('../../lib/genericFLIFO.test')('Stack');

describe('Specific Stack behaviour', () => {

  it('should remove from bottom', (done) => {
    let testingStack = new Stack(),
      i;
    for (i = 1; i <= numberOfItems; i++)  {
      testingStack.push(i);
    }
    for (i = numberOfItems; i > 1; i--){
      testingStack.pop();
      if (testingStack.length != i - 1){
        return done(new Error('Length does not decrease when removing elements'));
      }
      if(testingStack.elements[i - 2] != i - 1){
        return done(new Error('Element not found at bottom'));
      }
    }
    done();
  });

});
