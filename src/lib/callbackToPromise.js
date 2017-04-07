module.exports = (promiseLibrary) => {
  if (typeof(promiseLibrary) !== 'function'){
    return (err, cb, result) => {
      if (err){
        throw err;
      }
      return result;
    }
  }
  return (err, cb, result) => {
    if (cb){
      return cb(err, result);
    }
    return new promiseLibrary((resolve, reject) =>{
      if(err){
        return reject(err);
      }
      return resolve(result);
    });
  }
}
