var comparatorFactory = require('../lib/comparator');

function factory(DataStructure, promiseLibrary, callback){

  class ListNode{
    constructor(value, next){
      this.value = value;
      this.next = next;
    }
  }

  class List extends DataStructure{

    constructor(compareTo){
      super();
      this.length = 0;
      this.head  = undefined;
      this.tail = undefined;
      this.compareTo = comparatorFactory(compareTo);
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
        if (this.compareTo(currentNode.value, element) === 0){
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
