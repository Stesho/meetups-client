function getLastN3(arr, count) {
  const newArr = [];
  for(let i = 0; i < count; i++) {
    newArr.unshift(arr.pop());
  }
  return newArr;
}

console.log(getLastN3([1, 2, 3, 4, 5, 6, 7], 3));
console.log(getLastN3([1, 2], 3));