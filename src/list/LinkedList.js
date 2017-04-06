function factory(promiseLibrary, callback){

  class ListNode{
    constructor(value, next){
      this.value = value;
      this.next = next;
    }
  }

  class List{

    constructor(){
      this.length = 0;
      this.head  = undefined;
      this.tail = undefined;
    }

    add(element, cb){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined);
        this.tail = this.head;
        return callback(null, cb, null);
      }
      let newTail = new ListNode(element, undefined);
      this.tail.next = newTail;
      this.tail = newTail;
      return callback(null, cb, null);
    }

    unshift(element, cb){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined);
        this.tail = this.head;
        return callback(null, cb, null);
      }
      let newHead = new ListNode(element, this.head);
      this.head = newHead;
      return callback(null, cb, null);
    }

    shift(cb){
      if(this.length == 0){
        return callback(null, cb, undefined);
      }
      this.length--;
      let savedHead = this.head;
      if (this.length <= 1){
        this.head = this.tail;
        return callback(null, cb, savedHead.value);
      }
      this.head = this.head.next;
      return callback(null, cb, savedHead.value);
    }

    pop(cb){
      let i;
      if(this.length == 0){
        return callback(null, cb, undefined);
      }
      this.length--;
      if (this.length == 0){
        let savedValue = this.head.value;
        this.head = this.tail = undefined;
        return callback(null, cb, savedValue);
      }
      let savedTail = this.tail;
      let beforeTail = this.head;
      for(i=1; i<this.length; i++){
        beforeTail = beforeTail.next;
      }
      this.tail = beforeTail;
      this.tail.next = undefined;
      return callback(null, cb, savedTail.value);
    }

    splice(number, cb){
      if(number >= this.length || this.length == 0 || number < 0){
        return callback(null, cb, undefined);
      }
      let currentNode = this.head,
        savedNode,
        i;
      for (i = 1; i < number; i++){
        currentNode = currentNode.next;
      }
      savedNode = currentNode.next;
      currentNode.next = currentNode.next? currentNode.next.next: undefined;
      this.length--;
      return callback(null, cb, savedNode.value);
    }

    *[Symbol.iterator](){
      let savedValue,
        currentNode,
        i;
      currentNode= this.head;
      for (i=1; i<= this.length; i++){
        savedValue = currentNode.value;
        currentNode = currentNode.next;
        yield savedValue;
      }
    }

    contains(element){
      let currentNode = this.head,
        i;
      for (i=1; i<= this.length; i++){
        if (currentNode.value === element){
          return true;
        }
        currentNode = currentNode.next;
      }
      return false;
    }

    toString(){
      let currentNode = this.head,
        string = '[',
        i;
      for (i=0; i< this.length; i++){
        string += currentNode.value;
        string += currentNode.next !== undefined?',':'';
        currentNode = currentNode.next;
      }
      return string+']';
    }
  }

  return List;
}

module.exports = (promiseLibrary) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  return factory(promiseLibrary, callback);
};
