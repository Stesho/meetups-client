function getLastN1(arr, count) {
  if(count === undefined || arr.length < count) {
    return arr;
  }
  const startIndex = arr.length - count;

  return arr.splice(startIndex, count + 1);
}

console.log(getLastN1([1, 2]));