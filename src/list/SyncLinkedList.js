function factory(AbstractList, ListNode, promiseLibrary, callback){


  class List extends AbstractList{

    add(element){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined);
        this.tail = this.head;
        return;
      }
      let newTail = new ListNode(element, undefined);
      this.tail.next = newTail;
      this.tail = newTail;
    }

    unshift(element){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined);
        this.tail = this.head;
        return;
      }
      let newHead = new ListNode(element, this.head);
      this.head = newHead;
    }

    shift(){
      if(this.length == 0){
        return undefined;
      }
      this.length--;
      let savedHead = this.head;
      if (this.length <= 1){
        this.head = this.tail;
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
      let beforeTail = this.head;
      for(i=1; i<this.length; i++){
        beforeTail = beforeTail.next;
      }
      this.tail = beforeTail;
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
