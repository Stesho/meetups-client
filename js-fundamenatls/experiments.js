let arr = [
  { country: 'Belarus', city: 'Brest', population: 10 },
  { country: 'Russia', city: 'Omsk' },
  { country: 'Russia', city: 'Samara', population: 3 },
  { country: 'Belarus', city: 'Grodno' },
  { country: 'Belarus', city: 'Minsk', population: 2 },
  { country: 'Poland', city: 'Lodz', population: 10 },
];

function group1(arr, field) {
  const filedsValue = new Set(arr.map(item => item[field]).filter(item => item !== undefined));
  const resultArray = [];

  filedsValue.forEach(fieldValue => {
    const newArray = [];
    const items = arr.filter(item => item[field] === fieldValue);

    newArray.push(fieldValue, items);

    resultArray.push(newArray);
  });

  return resultArray;
}

console.log(group1(arr, 'population'));