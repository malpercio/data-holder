let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')();
let List = dataHolder.SyncDoubleLinkedList;

let genericTests = require('../../lib/genericSyncList.test')('DoubleLinkedList');

describe('SyncDoubleLinkedList specific behaviour', () => {

    it('should link backwards when adding', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
        if (testingList.tail.prev && testingList.tail.prev.value != i - 1){
          return done(new Error('Previous element not found'));
        }
      }
      done();
    });

    it('should link backwards when popping', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
        }
      for (i=0; i<= numberOfItems; i++){
        testingList.pop();
        if (testingList.tail && testingList.tail.value != numberOfItems - i - 1 ){
          return done(new Error('Previous element not found'));
        }
      }
      done();
    });

});
