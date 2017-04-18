module.exports = function(implementation){
  let assert = require('assert');
  let faker = require('faker');

  let numberOfItems = faker.random.number()%100 + 1;

  let DataStructure = require('../../index.js')('Sync', implementation);

  describe('Generic DataStructure behaviour ---'+ implementation, () => {

    it('should create an object', (done) => {
      let testingDataStructure = new DataStructure();
      if (typeof testingDataStructure == 'object' && testingDataStructure instanceof DataStructure){
        return done();
      }
      return done(new Error('Not an object'));
    });

    it('should reduce',(done) => {
      let testingDataStructure = new DataStructure(),
        total = 0,
        fx = (x, y) => x + y,
        i;
        for(i = 1; i<= numberOfItems; i++){
          total += i;
          if(testingDataStructure.add){
            testingDataStructure.add(i);
          }
          else{
            testingDataStructure.push(i);
          }
        }
        if (testingDataStructure.reduce(fx) !== total){
          return done(new Error('Bad Total'));
        }
        done();
    });

  });
}
