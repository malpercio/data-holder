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
        return callback(cb, null, previous);
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
