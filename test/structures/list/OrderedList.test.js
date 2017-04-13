let assert = require('assert');
let faker = require('faker');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')('Sync');
let List = dataHolder.DoubleLinkedList;

let genericTests = require('../../lib/genericList.test')('OrderedList');
let doubleLinkedListTest = require('./DoubleLinkedList.test')('OrderedList');

describe('OrderedList specific behaviour', () => {

    it('should be ordered when adding', (done) => {
      let testingList = new List(),
        i,
        j;
      for (i=0; i <= numberOfItems; i+=3){
        testingList.add(i);
        for (j = testingList.head; j != testingList.tail.prev; j = j.next){
          if (j.next && j > j.next){
            return done(new Error('Elements not in increasing order.'));
          }
        }
        i-=2;
      }
      done();
    });

    it('should be ordered when adding with custom order', (done) => {
      let compareTo = (x, y) => {
        if(x < y){
          return 1;
        }
        else if( x > y){
          return -1;
        }
        return 0;
      };
      let testingList = new List(compareTo),
        i,
        j;
      for (i=0; i <= numberOfItems; i+=3){
        testingList.add(i);
        for (j = testingList.head; j != testingList.tail.prev; j = j.next){
          if (j.next && j < j.next){
            return done(new Error('Elements not in decreasing order.'));
          }
        }
        i-=2;
      }
      done();
    });

    it('should be ordered when popping', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i <= numberOfItems; i+=3){
        testingList.add(i);
        i-=2;
        }
      for (i=0; i <= numberOfItems; i++){
        testingList.pop();
        if (testingList.tail && testingList.tail.value != numberOfItems - i - 1 ){
          return done(new Error('Elements not in increasing order.'));
        }
      }
      done();
    });

    it('should be ordered when shifting', (done) => {
      let testingList = new List(),
        i;
      for (i=0; i <= numberOfItems; i+=3){
        testingList.add(i);
        i-=2;
        }
      for (i=0; i <= numberOfItems; i++){
        testingList.shift();
        if (testingList.head && testingList.head.value != i +1 ){
          return done(new Error('Elements not in increasing order.'));
        }
      }
      done();
    });

    it('should be ordered when splicing', (done) => {
      let testingList = new List(),
        i,
        j = 0,
        savedNode;
      for (i=0; i <= numberOfItems; i+=3){
        testingList.add(i);
        i-=2;
        }
      for (i=1; i <= numberOfItems; i++){
        testingList.splice(1);
        savedNode = this.tail;
        for (savedNode = testingList.tail; j < testingList.length; savedNode = savedNode.prev){
          j++;
        }
        if (savedNode.element != testingList.head.element){
          return done(new Error('Elements not in increasing order.'));
        }
      }
      done();
    });
});
