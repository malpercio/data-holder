let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')('Sync');
let Stack = dataHolder.Stack;

function isEmpty (testingStack, done){
  if(testingStack.length != 0){
    return done(new Error('Stack has a non zero initial length'));
  }
  if (testingStack.elements[0]){
    return done(new Error('Stack has at least one element.'));
  }
  done();
}

describe('Stack behaviour', () => {

  it('should create an object', function(done){
    let testingList = new Stack();
    if (typeof testingList == 'object' && testingList instanceof Stack){
      return done();
    }
    return done(new Error('Not an object'));
  });

  it('should add at bottom', (done) => {
    let testingStack = new Stack(),
      i;
    for (i = 1; i <= numberOfItems; i++){
      testingStack.push(i);
      if (testingStack.length != i){
        return done(new Error('Length does not increase when adding elements'));
      }
      if(testingStack.elements[i - 1] != i){
        return done(new Error('Element not found at bottom'));
      }
    }
    done();
  });

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

  it('should have next item while not empty', (done) => {
    let testingStack = new Stack(),
    i;
    for (i = 0; i <= numberOfItems; i++){
      testingStack.push(i);
      if (!testingStack.hasNext()){
        return done(new Error('Elements not found'));
      }
    }
    for (i = numberOfItems; i >= 1; i--){
      testingStack.pop();
      if (!testingStack.hasNext()){
        return done(new Error('Element not found'));
      }
    }
    testingStack.pop();
    if(testingStack.hasNext()){
      return done(new Error('Element found'));
    }
    done();
  });

  it('should empty stack', (done) => {
    let testingStack = new Stack(),
      i;
    for (i = 1; i <= numberOfItems; i++){
      testingStack.push(i);
    }
    testingStack.empty();
    isEmpty(testingStack, done);
  });

  it('should be empty at creation', (done) => {
    let testingStack = new Stack();
    isEmpty(testingStack, done);
  });

});
