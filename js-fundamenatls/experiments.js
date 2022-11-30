let arr = [
  { country: 'Belarus', city: 'Brest' },
  { country: 'Russia', city: 'Omsk' },
  { country: 'Russia', city: 'Samara' },
  { country: 'Belarus', city: 'Grodno' },
  { country: 'Belarus', city: 'Minsk' },
  { country: 'Poland', city: 'Lodz' },
];

function group1(arr, field) {
  const filedsValue = new Set(arr.map(item => item[field]));
  const resultArray = [];

  filedsValue.forEach(fieldValue => {
    const newArray = [];
    const items = arr.filter(item => item[field] === fieldValue);

    newArray.push(fieldValue, items);

    resultArray.push(newArray);
  });

  return resultArray;
}

console.log(group1(arr, 'country'));