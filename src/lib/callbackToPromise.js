module.exports = (promiseLibrary) => {
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
