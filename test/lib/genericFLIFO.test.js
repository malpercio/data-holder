module.exports = function(implementation){
  let assert = require('assert');
  let faker = require('faker');

  let numberOfItems = faker.random.number()%100 + 1;

  let FLIFO = require('../../index.js')('Sync', implementation);
  
  function isEmpty (testingFLIFO, done){
    if(testingFLIFO.length != 0){
      return done(new Error('FLIFO has a non zero initial length'));
    }
    if (testingFLIFO.elements[0]){
      return done(new Error('FLIFO has at least one element.'));
    }
    done();
  }

  describe('Generic FLIFO behaviour', () => {

    it('should create an object', function(done){
      let testingList = new FLIFO();
      if (typeof testingList == 'object' && testingList instanceof FLIFO){
        return done();
      }
      return done(new Error('Not an object'));
    });

    it('should add at bottom', (done) => {
      let testingFLIFO = new FLIFO(),
        i;
      for (i = 1; i <= numberOfItems; i++){
        testingFLIFO.push(i);
        if (testingFLIFO.length != i){
          return done(new Error('Length does not decrease when adding elements'));
        }
        if(testingFLIFO.elements[i - 1] != i){
          return done(new Error('Element not found at bottom'));
        }
      }
      done();
    });

    it('should have next item while not empty', (done) => {
      let testingFLIFO = new FLIFO(),
      i;
      for (i = 0; i <= numberOfItems; i++){
        testingFLIFO.push(i);
        if (!testingFLIFO.hasNext()){
          return done(new Error('Elements not found'));
        }
      }
      for (i = numberOfItems; i >= 1; i--){
        testingFLIFO.pop();
        if (!testingFLIFO.hasNext()){
          return done(new Error('Element not found'));
        }
      }
      testingFLIFO.pop();
      if(testingFLIFO.hasNext()){
        return done(new Error('Element found'));
      }
      done();
    });

    it('should empty FLIFO', (done) => {
      let testingFLIFO = new FLIFO(),
        i;
      for (i = 1; i <= numberOfItems; i++){
        testingFLIFO.push(i);
      }
      testingFLIFO.empty();
      isEmpty(testingFLIFO, done);
    });

    it('should be empty at creation', (done) => {
      let testingFLIFO = new FLIFO();
      isEmpty(testingFLIFO, done);
    });

    it('should implement toString', (done) => {
      let testingFLIFO = new FLIFO(),
        i;
      for (i = 1; i <= numberOfItems; i++){
        testingFLIFO.push(i);
      }
      if (/^\[(\d+,)*\d+\]$/.exec(testingFLIFO.toString()).input!== testingFLIFO.toString()){
        return done(new Error('Incorrect comma separation'));
      }
      for (i = 1; i <= numberOfItems; i++){
        if (testingFLIFO.toString().indexOf(i+'') === -1){
          return done(new Error('Missing item'+ i));
        }
      }
      done();
    });

  });
}
