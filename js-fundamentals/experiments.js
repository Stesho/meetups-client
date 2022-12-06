async function Promise_all(promises) {
  const results = [];
  let isCompleted = 0;
  
  for(let i = 0; i < promises.length; i++) {
    const promise = promises[i];
    // const value = await promises[i];
    // if(value) {
    //   isCompleted++;
    //   results[i] = value;
    //   if(results.length === isCompleted) {
    //     resolve(results);
    //   }
    // }
    // else {
    //   reject(undefined);
    // }
    promise.then(value => {
      isCompleted++;
      results[i] = value;
      if(results.length === isCompleted) {
        resolve(results);
      }
    }).catch(() => reject(undefined));
  }

  return results;
}

console.log(Promise_all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]))
