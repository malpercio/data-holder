'use strict';
module.exports = (promiseLibrary, returnInnerClasses) => {
  return require('./FLIFO')(promiseLibrary,returnInnerClasses, 'push', 'shift');
};
