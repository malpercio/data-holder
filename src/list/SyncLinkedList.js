function factory(promiseLibrary){

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

    add(element){
      this.length++;
      if (this.length === 1){
        this.head = new ListNode(element, undefined);
        this.tail = this.head;
        return;
      }
      let newTail = new ListNode(element, undefined);
      this.tail.next = newTail;
      this.tail = newTail;  }

    unshift(){
      if(this.length == 0){
        return undefined;
      }
      this.length--;
      let savedHead = this.head;
      if (this.length <= 1){
        this.head = this.tail;
        return savedHead;
      }
      this.head = this.head.next;
      return savedHead;
    }

    pop(){
      let i;
      if(this.length == 0){
        return undefined;
      }
      this.length--;
      let savedTail = this.tail;
      let beforeTail = this.head;
      for(i=1; i<=this.length; i++){
        beforeTail = beforeTail.next;
      }
      this.tail = this.beforeTail;
      return savedTail;
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
      return savedNode;
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
  return factory(promiseLibrary);
};
