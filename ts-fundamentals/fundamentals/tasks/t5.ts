// Type function useState. See source code for more details

function useState<T>(initialValue: T) {
  let currentValue: T = initialValue;
  const setValue = (value: T) => {
    currentValue = value;
  };
  const getValue = () => currentValue;
  const resArr: [() => T, (value: T) => void, T] = [getValue, setValue, initialValue]; 
  return resArr;
}

const [getValue, setValue, initialValue] = useState(10);
const v = getValue();
setValue(20);
