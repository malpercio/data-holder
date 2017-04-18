let DataStructure = require('../DataStructure');

function factory(promiseLibrary, callback, returnInnerClasses, add, remove){

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

  }
  if (returnInnerClasses){
    return [FLIFO];
  }
  return FLIFO;
}

module.exports = (promiseLibrary, returnInnerClasses, add, remove) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  return factory(promiseLibrary, callback, returnInnerClasses, add, remove);
};
