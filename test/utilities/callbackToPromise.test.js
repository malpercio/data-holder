let assert = require('assert');
let faker = require('faker');

let dataHolder = require('../../index.js')();
let List = dataHolder.LinkedList;

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
