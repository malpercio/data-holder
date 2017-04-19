let series = require('async/series');

function factory(DataStructure, promiseLibrary, callback, returnInnerClasses, add, remove){

  class FLIFO extends DataStructure{

    constructor(){
      super();
      this.elements = [];
      this.length = 0;
    }

    pop(cb){
      let lastElement = this.elements[remove]();
      this.length = this.elements.length;
      return callback(null, cb, lastElement);
    }

    push(element, cb){
      let lastElement = this.elements[add](element);
      this.length = this.elements.length;
      return callback(null, cb);
    }

    hasNext(cb){
      return callback(null, cb, this.length > 0);
    }

    empty(cb){
      this.elements = [];
      this.length = 0;
      return callback(null, cb);
    }

    toString(){
      let str = '[',
        i;
      for(i of this.elements){
        str += i + ',';
      }
      str = str.substr(0, str.length - 1) + ']';
      return str;
    }

    reduce(fx, cb){
      let i,
        first = true,
        previous;
      for(i = 0; i < this.elements.length; i++){
        if (first){
          first = false;
          previous = this.elements[i];
          continue;
        }
        previous = fx(this.elements[i], previous);
      }
      return callback(null, cb, previous);
    }

    filter(fx, cb){
      let newStructure,
        functions = [];
      newStructure = new this.constructor();
      for(let element of this.elements){
        if(fx(element)){
          functions.push((next) => {newStructure.push(element, next)});
        }
      }
      series(functions, (err) => {return callback(err, cb, newStructure)})
    }

  }
  if (returnInnerClasses){
    return [FLIFO];
  }
  return FLIFO;
}

module.exports = (promiseLibrary, returnInnerClasses, add, remove) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  let DataStructure = require('../DataStructure')(promiseLibrary);
  return factory(DataStructure, promiseLibrary, callback, returnInnerClasses, add, remove);
};
