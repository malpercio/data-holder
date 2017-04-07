let assert = require('assert');
let faker = require('faker');
let times = require('async/times');

let numberOfItems = faker.random.number()%100 + 1;
let arbitraryElement = 'Bunny';

let dataHolder = require('../../../index.js')();
let List = dataHolder.DoubleLinkedList;

let genericTests = require('../../lib/genericList.test')('DoubleLinkedList');

describe('DoubleLinkedList specific behaviour', () => {

    it('should link backwards when adding', (done) => {
      let testingList = new List(),
        i;
      times(numberOfItems, (i, next) => {
        testingList.add(i, (err) => {
          if (err){
            return next(err);
          }
          if (testingList.tail.prev && testingList.tail.prev.value != i - 1){
            return next(new Error('Previous element not found'));
          }
          return next();
        });
      }, done);
    });

    it('should link backwards when popping', (done) => {
      let testingList = new List(),
        i;
      times(numberOfItems, (i, next) => {testingList.add(i, next)}, () => {
        times(numberOfItems, (i, next) => {
          testingList.pop((err) => {
            if (err){
              return next(err);
            }
            if (testingList.tail && testingList.tail.value != numberOfItems - i - 2 ){
              return next(new Error('Previous element not found'));
            }
            return next();
          });
        }, done);
      });
    });

    it('should link backwards when shifting', (done) => {
      let testingList = new List(),
        i;
      times(numberOfItems, (i, next) => {testingList.add(i, next)}, () => {
        times(numberOfItems, (i, next) => {
          testingList.shift((err) => {
            if (err){
              return next(err);
            }
            if (testingList.head && testingList.head.value != i + 1){
              return next(new Error('Previous element not found'));
            }
            return next();
          });
        }, done);
      });
    });

    it('should link backwards when unshifting', (done) => {
      let testingList = new List(),
        i;
      times(numberOfItems, (i, next) => {
        testingList.unshift(i, (err) => {
          if (err){
            return next(err);
          }
          if (testingList.head.next && testingList.head.next.prev.value != i){
            return next(new Error('Previous element not found'));
          }
          return next();
        });
      }, done);
    });

    it('should link backwards when splicing', (done) => {
      let testingList = new List(),
        i,
        j = 0,
        savedNode;
      times(numberOfItems, (i, next) => {testingList.add(i, next)}, () => {
        times(numberOfItems, (i, next) => {
          testingList.splice(1, (err) => {
            if (err){
              return next(err);
            }
            for (savedNode = testingList.tail; j < testingList.length; savedNode = savedNode.prev){
              j++;
            }
            if (savedNode.element != testingList.head.element){
              return next(new Error('Previous element not found'));
            }
            return next();
          });
        }, done);
      });
    });

});
