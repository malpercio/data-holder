module.exports = function(implementationName, implementationPath){
}

let assert = require('assert');
let faker = require('faker');
let List = require(implementationPath);

let numberOfItems = faker.random.number() + 1;
let arbitraryElement = 'Bunny';

describe('Generic list behaviour - ' + implementationName, function(){

  it('should create an object', function(done){
    let testingList = new List();
    if (typeof testingList == 'object' && testingList instanceof List){
      return done();
    }
      return done(new Error('Not an object'));
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
    for (i = numberOfItems; i <= 0; i--){
      testingList.unshift(arbitraryElement);
      if (testingList.length !== i){
        done(new Error('Length does not decreases when removing head'));
      }
    }
    let repopulate = function(){
      for (i = 1; i <= numberOfItems; i++){
        testingList.add(arbitraryElement);
      }
    };
    repopulate();
    for (i = numberOfItems; i <= 0; i--){
      testingList.pop(arbitraryElement);
      if (testingList.length !== i){
        done(new Error('Length does not decreases when removing last item'));
      }
    }
    repopulate();
    while(testingList.length > 2){
      testingList.splice(1);
      if (testingList.length !== numberOfItems--){
        done(new Error('Length does not decreases when removing arbitrary item'));
      }
    }
    done();
  });

  it('',function(done){

  });

});
