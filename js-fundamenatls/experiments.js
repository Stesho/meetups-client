function flat(arr) {
  const resultArray = [];

  for(let i = 0; i < arr.length; i++) {
    if(arr[i] instanceof Array) {
      resultArray.push(...arr[i]);
    }
    else {
      resultArray.push(arr[i]);
    }
  }

  return resultArray;
}

console.log(flat([1, [2, [3, [4]], 5]]));

// function flat(arr) {
//   const resultArray = [];

//   for(let i = 0; i < arr.length; i++) {
//     if(arr[i] instanceof Array) {
//       resultArray.push(...flat(arr[i]));
//     }
//     else {
//       resultArray.push(arr[i]);
//     }
//   }

//   return resultArray;
// }
