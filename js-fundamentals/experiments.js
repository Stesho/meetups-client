function pick1(obj, props) {
  if(props === undefined) {
    throw new Error();
  }

  const newObj = {};

  props.forEach(prop => {
    if(prop in obj) {
      newObj[prop] = obj[prop];
    }
  });

  return newObj;
}

const object = { a: 1, b: '2', c: null };
const props = ['a', 'c'];

console.log(pick1(object, props));