function factory(promiseLibrary, callback, returnInnerClasses){

  class Queue{

    constructor(){
      this.elements = [];
      this.length = 0;
    }

    pop(cb){
      let lastElement = this.elements.pop();
      this.length = this.elements.length;
      return callback(null, cb, lastElement);
    }

    push(element, cb){
      let lastElement = this.elements.push(element);
      this.length = this.elements.length;
      return callback(null, cb);
    }

    hasNext(){
      return callback(null, cb, this.length > 0);
    }

    empty(){
      this.elements = [];
      this.length = 0;
      return callback(null, cb);
    }
  }
  if (returnInnerClasses){
    return [Queue];
  }
  return Queue;
}

module.exports = (promiseLibrary, returnInnerClasses) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  return factory(promiseLibrary, callback, returnInnerClasses);
};
