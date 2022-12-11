// Type function useState. See source code for more details

type state<T> = [() => T, (value: T) => void, T];

function useState<T>(initialValue: T): state<T> {
  let currentValue: T = initialValue;
  const setValue = (value: T) => {
    currentValue = value;
  };
  const getValue = () => currentValue; 
  return [getValue, setValue, initialValue];
}

const [getValue, setValue, initialValue] = useState(10);
const v = getValue();
setValue(20);
