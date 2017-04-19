'use strict';
let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%10 + 1;
let arbitraryElement = 'Bunny';


function repopulate(list){
  let next = (i) => {
    if (i == numberOfItems){
      return Promise.resolve();
    }
    return list.add(i).then(() => {
      return next(i+1);
    });
  }
  return next(0);
}

describe('Equivalence from callback to promises in an arbitrary structure', () => {

  let dataHolder = require('../../index.js')();
  let List = dataHolder.LinkedList;

  it('should add an element', (done) => {
    let testingList = new List(),
      addTest;
    addTest = (i) => {
      if (i == numberOfItems){
        return Promise.resolve();
      }
      return testingList.add(i).then(() => {
        if (!testingList.contains(i)){
          return Promise.reject(new Error('Element not found after insertion'));
        }
        if (testingList.length !== i+1){
          return Promise.reject(new Error('Length does not increases when adding elements'));
        }
        return addTest(i+1);
      });
    };
    addTest(0)
      .then(done)
      .catch(done);
  });

  it('should pop an element', (done) => {
    let testingList = new List(),
      popTest;
    popTest = (i) => {
      if (i == 0){
        return Promise.resolve();
      }
      return testingList.pop().then(() => {
        if (testingList.contains(numberOfItems - i)){
          return Promise.reject(new Error('Element found after deletion'));
        }
        if (testingList.length !== numberOfItems - i){
          return Promise.reject(new Error('Length does not decreases when popping elements'));
        }
        return addTest(i-1);
      });
    };
    repopulate(testingList).then(() => {
      popTest(0)
        .then(done)
        .catch(done);
    });
  });


  it('should shift an element', (done) => {
    let testingList = new List(),
      popTest;
    popTest = (i) => {
      if (i == 0){
        return Promise.resolve();
      }
      return testingList.shift().then(() => {
        if (testingList.contains(i)){
          return Promise.reject(new Error('Element found after deletion'));
        }
        if (testingList.length !== numberOfItems - i){
          return Promise.reject(new Error('Length does not decreases when popping elements'));
        }
        return addTest(i+1);
      });
    };
    repopulate(testingList).then(() => {
      popTest(0)
        .then(done)
        .catch(done);
    });
  });

  it('should unshift an element', (done) => {
    let testingList = new List(),
      unshiftTest;
    unshiftTest = (i) => {
      if (i == 0){
        return Promise.resolve();
      }
      return testingList.unshift(i).then(() => {
        if (!testingList.contains(i)){
          return Promise.reject(new Error('Element not found after insertion'));
        }
        if (testingList.length !== i){
          return Promise.reject(new Error('Length does not increases when unshifting elements'));
        }
        return unshiftTest(i+1);
      });
    };
    unshiftTest(0)
      .then(done)
      .catch(done);
  });
});

describe('Equivalence from callback to syncronous in an arbitrary structure', () => {

  let dataHolder = require('../../index.js')('Sync');
  let List = dataHolder.LinkedList;

  it('should add an element',(done)=>{
    let testingList = new List(),
      i;
    for (i=0; i<= numberOfItems; i++){
      testingList.add(i);
      if (testingList.tail.value != i){
        return done(new Error('Element not found after insertion'));
      }
    }
    done();
  });

  it('should pop an element',(done)=>{
    let testingList = new List(),
      i,
      value;
    for (i=0; i<= numberOfItems; i++){
      testingList.add(i);
    }
    for (i=numberOfItems; i > 0; i--){
      value = testingList.pop();
      if(testingList.tail.value == i){
        return done(new Error('Element found after deletion'));
      }
      if(value != i ){
        return done(new Error('Returning element is not correct'));
      }
    }
    done();
  });

  it('should shift an element',(done)=>{
    let testingList = new List(),
      i,
      value;
    for (i=0; i<= numberOfItems; i++){
      testingList.add(i);
    }
    for (i=0; i<= numberOfItems; i++){
      value = testingList.shift();
      if(testingList.contains(i)){
        return done(new Error('Element found after deletion'));
      }
      if(value != i ){
        return done(new Error('Returning element is not correct'));
      }
    }
    done();
  });

  it('should unshift an element',(done)=>{
    let testingList = new List(),
      i;
    for (i=0; i<= numberOfItems; i++){
      testingList.unshift(i);
      if(testingList.head.value != i){
        return done(new Error('Element not found after insertion'));
      }
    }
    done();
  });

  it('should splice an element',(done)=>{
    let testingList = new List(),
      i,
      value;
    for (i=0; i<= numberOfItems; i++){
      testingList.add(i);
    }
    for (i=1; i<= numberOfItems; i++){
      value = testingList.splice(1);
      if(testingList.contains(i)){
        return done(new Error('Element found after deletion'));
      }
      if(testingList.head.next &&testingList.head.next.value != i + 1 ){
        return done(new Error('Returning element is not correct'));
      }
    }
    done();
  });

  it('should have the given length', function(done){
    let i;
    let testingList = new List(),
      repopulate = ()=>{
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(arbitraryElement);
      }
    };
    if (testingList.length !== 0){
        return done(new Error('Length is not zero'));
    }
    for (i = 1; i <= numberOfItems; i++){
      testingList.add(arbitraryElement);
      if (testingList.length !== i){
        return done(new Error('Length does not increases when adding elements'));
      }
    }
    for (i = numberOfItems - 1; i >= 0; i--){
      testingList.shift();
      if (testingList.length !== i){
        return done(new Error('Length does not decreases when removing head' + i));
      }
    }
    for (i = 1; i<= numberOfItems; i++){
      testingList.unshift(1);
      if (testingList.length !== i){
        return done(new Error('Length does not decreases when inserting head' + i));
      }
    }
    for (i = numberOfItems - 1 ; i >= 0; i--){
      testingList.pop();
      if (testingList.length !== i){
        return done(new Error('Length does not decreases when removing last item'));
      }
    }
    repopulate();
    i = numberOfItems;
    while(testingList.length > 2){
      testingList.splice(1);
      i--;
      if (testingList.length !== i){
        return done(new Error('Length does not decreases when removing arbitrary item'));
      }
    }
    done();
  });
});
