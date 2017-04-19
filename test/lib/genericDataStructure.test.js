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

    it('should filter',(done) => {
      let testingDataStructure = new DataStructure(),
        fx = (x) => x < 0,
        i;
        for(i = 1; i<= numberOfItems; i++){
          if(testingDataStructure.add){
            testingDataStructure.add(i * Math.pow(-1,i));
          }
          else{
            testingDataStructure.push(i * Math.pow(-1,i));
          }
        }
        testingDataStructure.filter(fx, (err, newStructure) => {
          if(newStructure[Symbol.iterator]){
            for (i of newStructure){
              if(i >= 0){
                return done(new Error('The filter has a hole!'));
              }
            }
            return done();
          }
          while(newStructure.hasNext()){
            if(newStructure.pop() >= 0){
              return done(new Error('The filter has a hole!'));
            }
            return done();
          }
        });

    });

    it('should map',(done) => {
      let testingDataStructure = new DataStructure(),
        fx = (x) => x * x,
        i;
        for(i = 1; i<= numberOfItems; i++){
          if(testingDataStructure.add){
            testingDataStructure.add(i);
          }
          else{
            testingDataStructure.push(i);
          }
        }
        testingDataStructure.map(fx, (err, newStructure) => {
          if(newStructure.length === 0){
            return done("No elements added");
          }
          if(newStructure[Symbol.iterator]){
            for (i of newStructure){
              if(Math.sqrt(i) > numberOfItems){
                return done(new Error('The map wasn\'t applied correctly'));
              }
            }
            return done();
          }
          while(newStructure.hasNext()){
            if(Math.sqrt(i) > numberOfItems){
              return done(new Error('The map wasn\'t applied correctly'));
            }
            return done();
          }
        });

    });

  });
}
