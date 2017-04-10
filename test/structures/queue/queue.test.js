let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')('Sync');
let Queue = dataHolder.Queue;

function isEmpty (testingQueue, done){
  if(testingQueue.length != 0){
    return done(new Error('Queue has a non zero initial length'));
  }
  if (testingQueue.elements[0]){
    return done(new Error('Queue has at least one element.'));
  }
  done();
}

describe('Queue behaviour', () => {

  it('should create an object', function(done){
    let testingList = new Queue();
    if (typeof testingList == 'object' && testingList instanceof Queue){
      return done();
    }
    return done(new Error('Not an object'));
  });

  it('should add at bottom', (done) => {
    let testingQueue = new Queue(),
      i;
    for (i = 1; i <= numberOfItems; i++){
      testingQueue.push(i);
      if (testingQueue.length != i){
        return done(new Error('Length does not increase when adding elements'));
      }
      if(testingQueue.elements[i - 1] != i){
        return done(new Error('Element not found at bottom'));
      }
    }
    done();
  });

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

  it('should have next item while not empty', (done) => {
    let testingQueue = new Queue(),
    i;
    for (i = 0; i <= numberOfItems; i++){
      testingQueue.push(i);
      if (!testingQueue.hasNext()){
        return done(new Error('Elements not found'));
      }
    }
    for (i = numberOfItems; i >= 1; i--){
      testingQueue.pop();
      if (!testingQueue.hasNext()){
        return done(new Error('Element not found'));
      }
    }
    testingQueue.pop();
    if(testingQueue.hasNext()){
      return done(new Error('Element found'));
    }
    done();
  });

  it.skip('should empty queue', (done) => {
    let testingQueue = new Queue(),
      i;
    for (i = 1; i <= numberOfItems; i++){
      testingQueue.push(i);
    }
    testingQueue.empty();
    isEmpty(testingQueue, done);
  });

  it('should be empty at creation', (done) => {
    let testingQueue = new Queue();
    isEmpty(testingQueue, done);
  });

});
