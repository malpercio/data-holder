let available = {
  LinkedList: './src/list/LinkedList',
  DoubleLinkedList: './src/list/DoubleLinkedList',
  List: './src/list/DoubleLinkedList',
  OrderedList: './src/list/OrderedList',
  Queue: './src/flifo/Queue',
  Stack: './src/flifo/Stack'
};

module.exports = (promiseLibrary, structures) => {
  if(!promiseLibrary || promiseLibrary === 'Default' || promiseLibrary === 'default'){
    promiseLibrary = global.Promise;
  }
  let some = Array.isArray(structures);
  let unique = typeof(structures) == 'string';
  let dataStructures = {};
  if(unique){
    if(available[structures]){
      dataStructures = require(available[structures])(promiseLibrary);
    }
  }else if(some){
      for(structure in structures){
        if(available[structure]){
          dataStructures[structure] = require(available[structure])(promiseLibrary);
        }
      }
    }
  else{
    for (structure in available){
        dataStructures[structure] = require(available[structure])(promiseLibrary);
      }
  }
  return dataStructures;
};
