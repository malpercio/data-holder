function factory(AbstractList, Node, promiseLibrary, callback){

  class ListNode extends Node{
    constructor(value, prev, next){
      super(value, next);
      this.prev = prev;
    }
  }

  class List extends AbstractList{

    add(element){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined, undefined);
        this.tail = this.head;
        return;
      }
      let newTail = new ListNode(element, this.tail, undefined);
      this.tail.next = newTail;
      this.tail = newTail;
    }

    unshift(element){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined, undefined);
        this.tail = this.head;
        return;
      }
      let newHead = new ListNode(element, undefined, this.head);
      this.head.prev = newHead;
      this.head = newHead;
    }

    shift(){
      if(this.length == 0){
        return undefined;
      }
      this.length--;
      let savedHead = this.head;
      if (this.length == 0){
        this.head = this.tail = undefined;
        return savedHead.value;
      }
      this.head = this.head.next;
      return savedHead.value;
    }

    pop(){
      let i;
      if(this.length == 0){
        return undefined;
      }
      this.length--;
      if (this.length == 0){
        let savedValue = this.head.value;
        this.head = this.tail = undefined;
        return savedValue;
      }
      let savedTail = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = undefined;
      return savedTail.value;
    }

    splice(number){
      if(number >= this.length || this.length == 0 || number < 0){
        return undefined;
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
      return savedNode.value;
    }
  }

  return List;
}

module.exports = (promiseLibrary) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  var [List, ListNode] = require('./AbstractList')(promiseLibrary, callback);
  return factory(List, ListNode, promiseLibrary, callback);
};
