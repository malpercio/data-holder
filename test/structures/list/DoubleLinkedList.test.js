let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')('Sync');
let List = dataHolder.DoubleLinkedList;

let genericTests = require('../../lib/genericList.test')('DoubleLinkedList');

describe('SyncDoubleLinkedList specific behaviour', () => {

    it('should link backwards when adding', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i <= numberOfItems; i++){
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
      for (i=0; i <= numberOfItems; i++){
        testingList.add(i);
        }
      for (i=0; i <= numberOfItems; i++){
        testingList.pop();
        if (testingList.tail && testingList.tail.value != numberOfItems - i - 1 ){
          return done(new Error('Previous element not found'));
        }
      }
      done();
    });

    it('should link backwards when shifting', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i <= numberOfItems; i++){
        testingList.add(i);
        }
      for (i=0; i <= numberOfItems; i++){
        testingList.shift();
        if (testingList.head && testingList.head.value != i +1 ){
          return done(new Error('Previous element not found'));
        }
      }
      done();
    });

    it('should link backwards when unshifting', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i <= numberOfItems; i++){
        testingList.unshift(i);
        if (testingList.head.next && testingList.head.next.prev.value != i){
          return done(new Error('Previous element not found'));
        }
      }
      done();
    });

    it('should link backwards when splicing', (done) => {
      let testingList = new List(),
        i,
        j = 0,
        savedNode;
      for (i=0; i <= numberOfItems; i++){
        testingList.add(i);
        }
      for (i=1; i <= numberOfItems; i++){
        testingList.splice(1);
        savedNode = this.tail;
        for (savedNode = testingList.tail; j < testingList.length; savedNode = savedNode.prev){
          j++;
        }
        if (savedNode.element != testingList.head.element){
          return done(new Error('Previous element not found'));
        }
      }
      done();
    });

});
