'use strict';
module.exports = function(implementation){
  let assert = require('assert');
  let faker = require('faker');
  let times = require('async/times');

  let List = require('../../index.js')('Default', implementation);

  let numberOfItems = faker.random.number()%100 + 1;
  let arbitraryElement = 'Bunny';

  let genericDataStructureTests = require('./genericDataStructure.test')(implementation);

  describe('Generic list behaviour - ' + implementation, () => {

    it('should add an element',(done)=>{
      let testingList = new List();
      times(numberOfItems, (n, next) => {
        testingList.add(n, (err) => {
          if (err){
            return next(err);
          }
          if (testingList.tail.value != n){
            return next(new Error('Element not found after insertion'));
          }
          if (testingList.length !== n+1){
            return next(new Error('Length does not increases when adding elements'));
          }
          next();
        });
      }, done);
    });

    if (implementation == 'OrderedList'){
      it('should not unshift an element', (done) => {
        let testingList = new List();
        times(numberOfItems, (n, next) => {
          testingList.unshift(n, (err) => {
            if (err){
              return next();
            }
            next(new Error('OrderedList should not implement push.'));
          });
        }, done);
      });
    }
    else{
      it('should push an element',(done)=>{
        let testingList = new List();
        times(numberOfItems, (n, next) => {
          testingList.push(n, (err) => {
            if (err){
              return next(err);
            }
            if (testingList.tail.value != n){
              return next(new Error('Element not found after insertion'));
            }
            if (testingList.length !== n+1){
              return next(new Error('Length does not increases when pushing elements'));
            }
            next();
          });
        }, done);
      });
    }

    it('should pop an element',(done)=>{
      let testingList = new List();
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if (err){
          return done(err);
        }
        times(numberOfItems, (n, next) => {
          testingList.pop((err, value) => {
            if (err){
              return next(err);
            }
            if (testingList.tail && testingList.tail.value == numberOfItems - n){
              return next(new Error('Element found after deletion'));
            }
            if (testingList.length !== numberOfItems - n - 1){
              return next(new Error('Length does not decreases when removing last item'));
            }
            if(value != numberOfItems - n - 1){
              return done(new Error('Returning element is not correct'));
            }
            next();
          });
        }, done);
      });
    });

    it('should shift an element',(done)=>{
      let testingList = new List();
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if (err){
          return done(err);
        }
        times(numberOfItems, (n, next) => {
          testingList.shift((err, value) => {
            if (err){
              return next(err);
            }
            if (testingList.contains(n)){
              return next(new Error('Element found after deletion'));
            }
            if(value != n ){
              return done(new Error('Returning element is not correct'));
            }
            next();
          });
        }, done);
      });
    });

    if (implementation == 'OrderedList'){
      it('should not unshift an element', (done) => {
        let testingList = new List();
        times(numberOfItems, (n, next) => {
          testingList.unshift(n, (err) => {
            if (err){
              return next();
            }
            next(new Error('OrderedList should not implement unshift.'));
          });
        }, done);
      });
    }
    else{
      it('should unshift an element',(done)=>{
        let testingList = new List();
        times(numberOfItems, (n, next) => {
          testingList.unshift(n, (err) => {
            if (err){
              return next(err);
            }
            if (testingList.head.value != n){
              return next(new Error('Element not found after insertion'));
            }
            if (testingList.length !== n+1){
              return next(new Error('Length does not increases when adding elements'));
            }
            next();
          });
        }, done);
      });
    }

    it('should splice an element',(done)=>{
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
      }
      for (i=1; i<= numberOfItems; i++){
        testingList.splice(1);
        if(testingList.head.next &&testingList.head.next.value != i + 1){
          return done(new Error('Element found after deletion'));
        }
        if (testingList.length !== numberOfItems-i+1){
          return done(new Error('Length does not decreases when removing arbitrary item'));
        }
      }
      done();
    });

    it('should have the given initial length', function(done){
      let testingList = new List();
      if (testingList.length !== 0){
          return done(new Error('Length is not zero'));
      }
      done();
    });

    it('should find an existing item',function(done){
      let testingList = new List(),
      i;
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if(err){
          return done(err);
        }
        for (i = 0; i < numberOfItems; i++){
          if (!testingList.contains(i)){
            return done(new Error('Item not found.'));
          }
        }
        done();
      });
    });


    it('should implement toString',(done)=>{
      let testingList = new List(),
        i;
      if (testingList.toString() !== '[]'){
        return done(new Error('Empty string is simply wrong'))
      }
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if (err){
          return done(err);
        }
        if (/^\[(\d+,)*\d+\]$/.exec(testingList.toString()).input!== testingList.toString()){
          return done(new Error('Incorrect comma separation'));
        }
        for (i = 1; i < numberOfItems; i++){
          if (testingList.toString().indexOf(i) === -1){
            return done(new Error('Missing item'));
          }
        }
        done();
      });
    });

    it('should implement contains',(done)=>{
      let testingList = new List(),
        i;
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if (err){
          return done(err);
        }
        for(i = 0; i < numberOfItems; i++){
          if (!testingList.contains(i)){
            return done(new Error('Item not found'));
          }
        }
        done();
      });
    });


  });
}
