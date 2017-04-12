function factory(AbstractList, Node, promiseLibrary, callback, returnInnerClasses){

  class ListNode extends Node{
    constructor(value, prev, next){
      super(value, next);
      this.prev = prev;
    }
  }

  class List extends AbstractList{

    constructor(){
      super();
      this.push = this.add;
    }

    add(element, cb){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined, undefined);
        this.tail = this.head;
        return callback(null, cb);
      }
      let newTail = new ListNode(element, this.tail, undefined);
      this.tail.next = newTail;
      this.tail = newTail;
      return callback(null, cb);
    }

    unshift(element, cb){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined, undefined);
        this.tail = this.head;
        return callback(null, cb);
      }
      let newHead = new ListNode(element, undefined, this.head);
      this.head.prev = newHead;
      this.head = newHead;
      return callback(null, cb)
    }

    shift(cb){
      if(this.length == 0){
        return undefined;
      }
      this.length--;
      let savedHead = this.head;
      if (this.length == 0){
        this.head = this.tail = undefined;
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
      this.tail = this.tail.prev;
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
      currentNode.prev = currentNode.prev? currentNode.prev.prev: undefined;
      this.length--;
      return callback(null, cb, savedNode.value);
    }
  }

  if (returnInnerClasses){
    return [List, ListNode];
  }
  return List;
}

module.exports = (promiseLibrary, returnInnerClasses) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  var [List, ListNode] = require('./AbstractList')(promiseLibrary, callback);
  return factory(List, ListNode, promiseLibrary, callback, returnInnerClasses);
};
