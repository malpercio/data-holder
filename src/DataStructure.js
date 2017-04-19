let series = require('async/series');

function factory(promiseLibrary, callback, returnInnerClasses){
  class DataStructure{

      constructor(){};

      reduce(fx, cb){
        let previous,
          first = true,
          element;
        for(element of this){
          if (first){
            first = false;
            previous = element;
            continue;
          }
          previous = fx(element, previous);
        }
        return callback(null, cb, previous);
      }

      filter(fx, cb){
        let newStructure,
          functions = [];
        newStructure = new this.constructor(this.compareTo);
        for(let element of this){
          if(fx(element)){
            functions.push((next) => {newStructure.add(element, next)});
          }
        }
        series(functions, (err) => {return callback(err, cb, newStructure)})
      }

      map(fx, cb){
        let newStructure,
          functions = [];
        newStructure = new this.constructor(this.compareTo);
        for(let element of this){
            functions.push((next) => {newStructure.add(fx(element), next)});
        }
        series(functions, (err) => {return callback(err, cb, newStructure)})
      }

  }

  if(returnInnerClasses){
    return [DataStructure];
  }
  return DataStructure;
}


module.exports = (promiseLibrary, returnInnerClasses) => {
  var callback = require('./lib/callbackToPromise')(promiseLibrary);
  return factory(promiseLibrary, callback, returnInnerClasses);
};
