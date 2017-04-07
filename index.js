module.exports = (promiseLibrary) => {
  if(!promiseLibrary){
    promiseLibrary = global.Promise;
  }
  return {
    LinkedList: require('./src/list/LinkedList')(promiseLibrary),
    DoubleLinkedList: require('./src/list/DoubleLinkedList')(promiseLibrary),
    List: require('./src/list/DoubleLinkedList')(promiseLibrary),
    OrderedList: require('./src/list/OrderedList')(promiseLibrary)
  }
};
