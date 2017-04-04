module.exports = (promiseLibrary) => {
  if(!promiseLibrary){
    promiseLibrary = global.Promise;
  }
  return {
    SyncLinkedList: require('./src/list/SyncLinkedList')(promiseLibrary),
    LinkedList: require('./src/list/LinkedList')(promiseLibrary)
  }
};
