'use strict';
let lte = require('lodash/lte');

function factory(AbstractList, ListNode, promiseLibrary, callback, returnInnerClasses){

  class List extends AbstractList{

    add(element, cb){
      let i,
      previous = this.tail,
      next=undefined;
      this.length++;

      for(i = this.head; i!= undefined; i = i.next){
        if(this.compareTo(element, i.value) <= 0){
          previous = i.prev;
          next = i;
          break;
        }
      }
      let newNode = new ListNode(element, previous, next);
      if(previous){
        previous.next = newNode;
      }
      if(next){
        next.previous = newNode;
      }
      if(newNode.prev === undefined){
        this.head = newNode;
      }
      if(newNode.next === undefined){
        this.tail = newNode;
      }
      return callback(null, cb, null);
    }

    unshift(element, cb){
      let err = new TypeError('Unsupported shift operation');
      return callback(err,cb);
    }

    push(element, cb){
      let err = new TypeError('Unsupported push operation');
      return callback(err,cb);
    }

  }
  if (returnInnerClasses){
    return [List, ListNode];
  }
  return List;
}

module.exports = (promiseLibrary, returnInnerClasses) => {
  var callback = require('../lib/callbackToPromise')(promiseLibrary);
  var [List, ListNode] = require('./DoubleLinkedList')(promiseLibrary, true);
  return factory(List, ListNode, promiseLibrary, callback, returnInnerClasses);
};
