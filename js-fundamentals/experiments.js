function partial2(fn, ...init) {
  return (arg) => fn.apply(null, ...init);
}

function partial1(fn, ...init) {
  return fn.bind(null, ...init);
}

const add = (a, b, c) => a + b + c;
const add10 = partial1(add, 10, 20);

console.log(add10(5));
console.log(add10(5));
