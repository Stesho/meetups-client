// Type function useState. See source code for more details

function useState(initialValue) {
  let currentValue = initialValue;
  const setValue = (value) => {
    currentValue = value;
  };
  const getValue = () => currentValue;
  return [getValue, setValue, initialValue];
}

const [getValue, setValue, initialValue] = useState(10);
const v = getValue();
setValue(20);
