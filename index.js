module.exports = (promiseLibrary) => {
  if(!promiseLibrary){
    promiseLibrary = global.Promise;
  }
  return {
    LinkedList: require('./src/list/LinkedList')(promiseLibrary)
  }
};
