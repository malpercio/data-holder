module.exports = function(implementation){
  let assert = require('assert');
  let faker = require('faker');
  let times = require('async/times');

  let dataHolder = require('../../index.js')();
  let List = dataHolder[implementation];

  let numberOfItems = faker.random.number()%10 + 1;
  let arbitraryElement = 'Bunny';

  describe('Generic list behaviour - ' + implementation, () => {
    it('should create an object', function(done){
      let testingList = new List();
      if (typeof testingList == 'object' && testingList instanceof List){
        return done();
      }
        return done(new Error('Not an object'));
    });

    it('should add an element',(done)=>{
      let testingList = new List();
      times(numberOfItems, (n, next) => {
        testingList.add(n, (err) => {
          if (err){
            return next(err);
          }
          if (!testingList.contains(n)){
            return next(new Error('Element not found after insertion'));
          }
          if (testingList.length !== n+1){
            return next(new Error('Length does not increases when adding elements'));
          }
          next();
        });
      }, done);
    });

    it('should pop an element',(done)=>{
      let testingList = new List();
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if (err){
          return done(err);
        }
        times(numberOfItems, (n, next) => {
          testingList.pop((err) => {
            if (err){
              return next(err);
            }
            if (testingList.contains(numberOfItems - n)){
              return next(new Error('Element found after deletion'));
            }
            if (testingList.length !== numberOfItems - n - 1){
              return next(new Error('Length does not decreases when removing last item'));
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
          testingList.shift((err) => {
            if (err){
              return next(err);
            }
            if (testingList.contains(n)){
              return next(new Error('Element found after deletion'));
            }
            next();
          });
        }, done);
      });
    });

    it('should add an element',(done)=>{
      let testingList = new List();
      times(numberOfItems, (n, next) => {
        testingList.unshift(n, (err) => {
          if (err){
            return next(err);
          }
          if (!testingList.contains(n)){
            return next(new Error('Element not found after insertion'));
          }
          if (testingList.length !== n+1){
            return next(new Error('Length does not increases when adding elements'));
          }
          next();
        });
      }, done);
    });

    it('should splice an element',(done)=>{
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
      }
      for (i=1; i<= numberOfItems; i++){
        testingList.splice(1);
        if(testingList.contains(i)){
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
      let testingList = new List();
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

    it('should be an iterable', (done)=>{
      let testingList = new List(),
      i;
      times(numberOfItems, (n,next) => {testingList.add(n,next)}, (err) => {
        if (err){
          return done(err);
        }
        i=0;
        for(item of testingList){
          if (item !== i){
            return done(new Error('Item not found in place'));
          }
          i++;
        }
        done();
      });
    });
  });
}
