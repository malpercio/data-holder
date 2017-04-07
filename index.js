module.exports = (promiseLibrary) => {
  if(!promiseLibrary){
    promiseLibrary = global.Promise;
  }
  return {
    SyncLinkedList: require('./src/list/SyncLinkedList')(promiseLibrary),
    LinkedList: require('./src/list/LinkedList')(promiseLibrary),
    SyncDoubleLinkedList: require('./src/list/SyncDoubleLinkedList')(promiseLibrary),
    SyncList: require('./src/list/SyncDoubleLinkedList')(promiseLibrary),
    DoubleLinkedList: require('./src/list/DoubleLinkedList')(promiseLibrary),
    List: require('./src/list/DoubleLinkedList')(promiseLibrary)
  }
};
