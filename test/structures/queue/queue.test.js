let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')('Sync');
let Queue = dataHolder.Queue;

let genericTests = require('../../lib/genericFLIFO.test')('Queue');

describe('Specific Queue behaviour', () => {

  it('should remove from top', (done) => {
    let testingQueue = new Queue(),
      i;
    for (i = 1; i <= numberOfItems; i++){
      testingQueue.push(i);
    }
    for (i = numberOfItems; i > 1; i--){
      testingQueue.pop();
      if (testingQueue.length != i - 1){
        return done(new Error('Length does not increase when removing elements'));
      }
      if(testingQueue.elements[0] != numberOfItems - i + 2){
        return done(new Error('Element not found at top'));
      }
    }
    done();
  });

});
