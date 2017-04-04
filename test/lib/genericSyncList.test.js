module.exports = function(implementation){
  let assert = require('assert');
  let faker = require('faker');

  let dataHolder = require('../../index.js')();
  let List = dataHolder["Sync" + implementation];

  let numberOfItems = faker.random.number()%10 + 1;
  let arbitraryElement = 'Bunny';

  describe('Generic synchronous list behaviour - ' + implementation, function(){

    it('should create an object', function(done){
      let testingList = new List();
      if (typeof testingList == 'object' && testingList instanceof List){
        return done();
      }
        return done(new Error('Not an object'));
    });

    it('should add an element',(done)=>{
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
        if (!testingList.contains(i)){
          done(new Error('Element not found after insertion'));
        }
      }
      done();
    });

    it('should pop an element',(done)=>{
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
      }
      for (i=numberOfItems; i>= 0; i--){
        testingList.pop();
        if(testingList.contains(i)){
          done(new Error('Element found after deletion'));
        }
      }
      done();
    });

    it('should unshift an element',(done)=>{
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
      }
      for (i=0; i<= numberOfItems; i++){
        testingList.unshift();
        if(testingList.contains(i)){
          done(new Error('Element found after deletion'));
        }
      }
      done();
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
          done(new Error('Element found after deletion'));
        }
      }
      done();
    });

    it('should have the given length', function(done){
      let testingList = new List();
      if (testingList.length !== 0){
          return done(new Error('Length is not zero'));
      }
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(arbitraryElement);
        if (testingList.length !== i){
          done(new Error('Length does not increases when adding elements'));
        }
      }
      for (i = numberOfItems - 1; i >= 0; i--){
        testingList.unshift();
        if (testingList.length !== i){
          done(new Error('Length does not decreases when removing head' + i));
        }
      }
      let repopulate = ()=>{
        for (i = 1; i <= numberOfItems; i++){
          testingList.add(arbitraryElement);
        }
      };
      repopulate();
      for (i = numberOfItems - 1 ; i >= 0; i--){
        testingList.pop();
        if (testingList.length !== i){
          done(new Error('Length does not decreases when removing last item'));
        }
      }
      repopulate();
      i = numberOfItems;
      while(testingList.length > 2){
        testingList.splice(1);
        i--;
        if (testingList.length !== i){
          done(new Error('Length does not decreases when removing arbitrary item'));
        }
      }
      done();
    });

    it('should find an existing item',function(done){
      let testingList = new List();
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(i);
        if (!testingList.contains(i)){
          return done(new Error('Item not found.'));
        }
      }
      done();
    });

    it('should be an iterable', (done)=>{
      let testingList = new List(),
        i;
      for (i=0; i<= numberOfItems; i++){
        testingList.add(i);
      }
      i=0;
      for(item of testingList){
        if (item !== i){
          done(new Error('Item not found in place'));
        }
        i++;
      }
      done();
    });

    it('should implement toString',(done)=>{
      let testingList = new List();
      if (testingList.toString() !== '[]'){
        done(new Error('Empty string is simply wrong'))
      }
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(i);
      }
      if (/^\[(\d+,)*\d+\]$/.exec(testingList.toString()).input!== testingList.toString()){
        done(new Error('Incorrect comma separation'));
      }
      for (i = 1; i <= numberOfItems; i++){
        if (testingList.toString().indexOf(i) === -1){
          done(new Error('Missing item' + i));
        }
      }
      done();
    });
  });
}
