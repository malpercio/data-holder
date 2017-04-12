let eq = require('lodash/isEqualWith');

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

    *[Symbol.iterator](){
      let savedValue,
        currentNode,
        i;
      currentNode = this.head;
      for (i = 1; i<= this.length; i++){
        savedValue = currentNode.value;
        currentNode = currentNode.next;
        yield savedValue;
      }
    }

    contains(element){
      let currentNode = this.head,
        i;
      for (i = 1; i <= this.length; i++){
        if (eq(currentNode.value, element)){
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
      for (i = 0; i < this.length; i++){
        string += currentNode.value;
        string += currentNode.next !== undefined?',':'';
        currentNode = currentNode.next;
      }
      return string+']';
    }
  }

  return [List, ListNode];
}

module.exports = factory;
