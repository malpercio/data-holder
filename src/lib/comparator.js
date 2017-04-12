let lt = require('lodash/lte');
let eq = require('lodash/isEqualWith');

module.exports = (compareTo) =>{
  if(typeof(compareTo) === 'function'){
    return compareTo;
  }
  return (x, y) => {
    if(eq(x,y)){
      return 0;
    } else if(lt(x, y)){
      return -1;
    }
    return 1;
  };
};
