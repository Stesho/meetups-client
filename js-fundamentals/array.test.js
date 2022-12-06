const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Array', () => {
  describe('double: Duplicate each array element twice', () => {
    function dublicate1(arr) {
      return [...arr, ...arr];
    }

    // alternative solution 1
    function dublicate2(arr) {
      return arr.concat(arr);
    }

    // alternative solution 2
    function dublicate3(arr) {
      const length = arr.length;
      for (let i = 0; i < length; i++) {
        const lastIndex = arr.length;
        arr[lastIndex] = arr[i];
      }
      return arr;
    }

    // alternative solution 3
    function dublicate4(arr) {
      arr.forEach((item) => {
        arr.push(item);
      });
      return arr;
    }

    const double = dublicate1;
    // const double = dublicate2;
    // const double = dublicate3;
    // const double = dublicate4;

    it('Should return specified array twice', () => {
      expect(double([1, 2, 3])).toStrictEqual([1, 2, 3, 1, 2, 3]);
    });

    it('Should return empty array if empty array passed', () => {
      expect(double([])).toStrictEqual([]);
    });

    it('Should work with any types', () => {
      expect(
        double(['5', { a: 5 }, 10, [4, 7], true, null, undefined])
      ).toStrictEqual([
        '5',
        { a: 5 },
        10,
        [4, 7],
        true,
        null,
        undefined,
        '5',
        { a: 5 },
        10,
        [4, 7],
        true,
        null,
        undefined,
      ]);
    });
  });

  describe('convertItemsToString: Convert each array element to string', () => {
    function convert1(arr) {
      return arr.map((item) =>
        typeof item === 'object'
          ? JSON.stringify(item)
              .replaceAll('"', '')
              .replaceAll(':', ': ')
              .replaceAll(',', ', ')
          : item.toString()
      );
    }

    const convertItemsToString = convert1;

    it('Converts number array to the array of string values', () => {
      expect(convertItemsToString([1, 2, 3])).toStrictEqual(['1', '2', '3']);
    });

    it('Should return empty array if empty array passed', () => {
      expect(convertItemsToString([])).toStrictEqual([]);
    });

    it('Should work with any types', () => {
      expect(
        convertItemsToString(['5', {a: true}, 10, [4, 7], true, null])
      ).toStrictEqual(['5', '{a: true}', '10', '[4, 7]', 'true', 'null']);
    });
  });

  describe('calculateOccurrences: Calculate occurrences of an item in the array', () => {
    function calculate1(arr, item) {
      return arr.reduce(
        (sum, current) =>
          typeof current === typeof item &&
          JSON.stringify(current) === JSON.stringify(item)
            ? sum + 1
            : sum,
        0
      );
    }

    const calculateOccurrences = calculate1;

    it('Should return the number of all occurrences of specified item in an array', () => {
      expect(calculateOccurrences([1, 2, 1, 4, 1], 1)).toBe(3);
    });

    it('Should work with any types', () => {
      expect(
        calculateOccurrences(['5', { a: true }, true, 10, [4, 7], true], true)
      ).toBe(2);
    });

    it('Should work with any types', () => {
      expect(
        calculateOccurrences(
          ['5', { a: true }, [4, 7], 10, [4, 7], true, null, [4, 7]],
          [4, 7]
        )
      ).toBe(3);
    });

    it('should return 0 if there is no match', () => {
      expect(calculateOccurrences([2, 3, 4], 1)).toBe(0);
    });

    it('Should search according to item type', () => {
      expect(calculateOccurrences([{ null: null }, [null], 'null'], null)).toBe(
        0
      );
    });
  });

  describe('toUppercase: Uppercase each array item', () => {
    function uppercase1(arr) {
      return arr.map((item) => item.toUpperCase());
    }
    
    // alternative solution
    function uppercase2(arr) {
      const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXUZ';
      const lower = 'abcdefghijklmnopqrstuvwxuz';

      for (let i = 0; i < arr.length; i++) {
        if(arr[i].match(/[a-z]/i)) {
          const index = lower.indexOf(arr[i]) || upper.indexOf(arr[i]);
          arr[i] = upper[index];
        }
      }

      return arr;
    }

    const toUppercase = uppercase1;
    // const toUppercase = uppercase2;

    it('Should convert strings from specified array to uppercase', () => {
      expect(toUppercase(['aaaa', 'abc'])).toStrictEqual(['AAAA', 'ABC']);
    });
  });

  describe('insert: Insert item into array', () => {
    function insertItem1(arr, ...items) {
      return Array.from(new Set([...arr, ...items].sort()));
    }

    // alternative solution
    function insertItem2(arr, ...items) {
      const tempArray = [...arr, ...items].sort();
      return [...tempArray].filter((item, index) => tempArray.indexOf(item) === index);
    }

    const insert = insertItem1;
    // const insert = insertItem2;

    it('Insert an item at specified position', () => {
      expect(insert([1, 2, 4], 3, 2)).toStrictEqual([1, 2, 3, 4]);
    });

    it('Should work with empty array', () => {
      expect(insert([], 3, 2, 1)).toStrictEqual([1, 2, 3]);
    });

    it('Should work without second parameter', () => {
      expect(insert([1, 2, 3])).toStrictEqual([1, 2, 3]);
    });
  });

  describe('last: Get n last items from array', () => {
    function getLastN1(arr, count) {
      if(count === undefined || arr.length < count) {
        return arr;
      }
      const startIndex = arr.length - count;

      return arr.splice(startIndex, count + 1);
    }

    // alternative solution 1
    function getLastN2(arr, count) {
      if(arr.length < count) {
        return arr;
      }

      return arr.slice(arr.length - count, arr.length);
    }

    // alternative solution 2
    function getLastN3(arr, count) {
      if(count === undefined || arr.length < count) {
        return arr;
      }

      const newArr = [];
      for(let i = 0; i < count; i++) {
        newArr.unshift(arr.pop());
      }
      return newArr;
    }

    const last = getLastN1;
    // const last = getLastN2;
    // const last = getLastN3;

    it('Should return n last items from the specified array', () => {
      expect(last([1, 2, 3, 4, 5, 6, 7], 3)).toStrictEqual([5, 6, 7]);
    });

    it('Should work if array length less then n', () => {
      expect(last([1, 2], 3)).toStrictEqual([1, 2]);
    });

    it('Should work without second parameter', () => {
      expect(last([1, 2])).toStrictEqual([1, 2]);
    });
  });

  describe('countFalsyValues: Count falsy values in the array', () => {
    function countFalsy1(arr) {
      return arr.reduce((sum, item) => !item ? sum : sum + 1, 0);
    }
    
    // alternative solution 1
    function countFalsy2(arr) {
      return arr.filter(item => !item).length;
    }

    // alternative solution 2
    function countFalsy3(arr) {
      let count = 0;

      arr.forEach(item => {
        if(Boolean(item)) {
          count++;
        }  
      })

      return count;
    }

    const countFalsyValues = countFalsy1;
    // const countFalsyValues = countFalsy2;
    // const countFalsyValues = countFalsy3;

    it('Should return number of falsy values in specified array', () => {
      expect(countFalsyValues([1, 0, '', null, 'hello', '0'])).toBe(3);
    });
  });

  describe('unique: Find all unique items in array', () => {
    function findUnique(arr) {
      return Array.from(new Set(arr));
    }

    const unique = findUnique;

    it('Should return array of unique items from specified array', () => {
      expect(unique(['a', 'b', 'a', 'c', 'e', 'b', 'o'])).toStrictEqual([
        'a',
        'b',
        'c',
        'e',
        'o',
      ]);
    });
  });

  describe('groupBy: Group array data by key', () => {
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

    const groupBy = group1;

    it('Should return a map of grouped data by key and value selector', function () {
      let arr = [
        { country: 'Belarus', city: 'Brest', population: 10 },
        { country: 'Russia', city: 'Omsk' },
        { country: 'Russia', city: 'Samara', population: 3 },
        { country: 'Belarus', city: 'Grodno' },
        { country: 'Belarus', city: 'Minsk', population: 2 },
        { country: 'Poland', city: 'Lodz', population: 10 },
      ];
  
      expect(groupBy(arr, 'country')).toStrictEqual([
        ['Belarus', [{ country: 'Belarus', city: 'Brest', population: 10 }, { country: 'Belarus', city: 'Grodno' }, { country: 'Belarus', city: 'Minsk', population: 2 }]],
        ['Russia', [{ country: 'Russia', city: 'Omsk' }, { country: 'Russia', city: 'Samara', population: 3 }]],
        ['Poland', [{ country: 'Poland', city: 'Lodz', population: 10 }]],
      ]);

      expect(groupBy(arr, 'city')).toStrictEqual([
        ['Brest', [ { country: 'Belarus', city: 'Brest', population: 10 } ]],
        ['Omsk', [ { country: 'Russia', city: 'Omsk' } ]],
        ['Samara', [ { country: 'Russia', city: 'Samara', population: 3 } ]],
        ['Grodno', [ { country: 'Belarus', city: 'Grodno' } ]],
        ['Minsk', [ { country: 'Belarus', city: 'Minsk', population: 2 } ]],
        ['Lodz', [ { country: 'Poland', city: 'Lodz', population: 10 } ]]
      ]);
    });

    it("Should work if items don't have a passed field", function () {
      let arr = [
        { country: 'Belarus', city: 'Brest', population: 10 },
        { country: 'Russia', city: 'Omsk' },
        { country: 'Russia', city: 'Samara', population: 3 },
        { country: 'Belarus', city: 'Grodno' },
        { country: 'Belarus', city: 'Minsk', population: 2 },
        { country: 'Poland', city: 'Lodz', population: 10 },
      ];

      expect(groupBy(arr, 'population')).toStrictEqual([
        [ 10, [ { country: 'Belarus', city: 'Brest', population: 10 }, { country: 'Poland', city: 'Lodz', population: 10 } ]],
        [ 3, [ { country: 'Russia', city: 'Samara', population: 3 } ]],
        [ 2, [ { country: 'Belarus', city: 'Minsk', population: 2 } ]]
      ]);
    });
  });

  describe('compact: Remove all falsy values from array', () => {
    function removeAll(arr) {
      return arr.filter(item => !!item);
    }

    const compact = removeAll;

    it('Should create array with all falsy values removed.', () => {
      expect(compact([1, 0, null, 'a'])).toStrictEqual([1, 'a']);
    });
  });

  describe('flatten: Flatten array. ', () => {
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

    const flatten = flat;

    it('Should flatten array (make it one level less deep)', () => {
      expect(flatten([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, [3, [4]], 5]);
    });
  });

  describe('flattenDeep: Flatten array deep. Write you own implementation do not use Array.flat', () => {
    function flat(arr) {
      const resultArray = [];
    
      for(let i = 0; i < arr.length; i++) {
        if(arr[i] instanceof Array) {
          resultArray.push(...flat(arr[i]));
        }
        else {
          resultArray.push(arr[i]);
        }
      }
    
      return resultArray;
    }
    
    const flattenDeep = flat;
    
    it('Should recursively flatten array.', () => {
      expect(flattenDeep([1, [2, [3, [4]], 5]])).toStrictEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('remove: Remove element from array by predicate', () => {
    function removeAll(arr, callback) {
      const removed = arr.filter(item => callback(item));
    
      arr.forEach((item, index) => {
        if(removed.indexOf(item) !== -1) {
          arr.splice(index, 1);
        }    
      });
    
      return removed;
    }
    
    // optimized solution
    function optimizedRemoveAll(arr, callback) {
      const removed = [];

      for(let i = 0, j = 0; i < arr.length; i++) {
        if(!callback(arr[i])) {
          arr[j] = arr[i];
          j++;
        }
        else {
          removed.push(arr[i]);
        }
      }

      arr.length -= removed.length;

      return removed;
    }

    const remove = optimizedRemoveAll;

    it(
      'Should remove all elements from array, that predicate returns truth for and return an array of the removed elements. ' +
        'The predicate is invoked with two arguments: (value, index).',
      () => {
        const arr = [1, 7, 5, 2, 8];
        const gt5 = (v) => v > 5;
      
        const removed = remove(arr, gt5);
      
        expect(arr).toStrictEqual([1, 5, 2]);
        expect(removed).toStrictEqual([7, 8]);
      }
    );

    it('Should work with any types',
      () => {
        const arr = [
          {country: 'Belarus'},
          false, 
          ['Belarus', false],
          'Belarus',
          {country: 'Belarus', city: 'Minsk'},
        ];

        const getBelarusObj = (item) => item.country === 'Belarus';

        let removed = remove(arr, getBelarusObj);

        expect(arr).toStrictEqual([false, [ 'Belarus', false ], 'Belarus']);
        expect(removed).toStrictEqual([{ country: 'Belarus' }, { country: 'Belarus', city: 'Minsk' }]);
      }
    );
  });

  describe('calculateTotal: Calculate basket total', () => {
    function calc(basket) {
      return basket.reduce((sum, item) => sum + item.price * item.count, 0);
    }

    const calculateTotal = calc;

    it('Should calculate total price for all goods in the basket', () => {
      const total = calculateTotal([
        {
          name: 'item A',
          price: 10,
          count: 2,
        },
        {
          name: 'item B',
          price: 30.5,
          count: 1,
        },
      ]);

      expect(total).toBe(50.5);
    });
  });

  describe('calculateTotal: Calculated basket total when basket contains only item id', () => {
    function calc(goods, basket) {
      return basket.reduce((sum, item) => {
        const good = goods.find(product => product.id === item.id);
        return sum + good.price * item.count;
      }, 0);
    }

    // alternative solution
    function calc1(goods, basket) {
      const goodsPrices = {};

      goods.forEach(good => {
        goodsPrices[good.id] = good.price;
      });
    
      return basket.reduce((sum, good) => (sum + goodsPrices[good.id] * good.count), 0);
    }

    const calculateTotal = calc1;

    it('Should calculate total price for all items in the basket', () => {
      const goods = [
        {
          id: 'AAA-AAA',
          name: 'item A',
          price: 10,
        },
        {
          id: 'BBB-BBB',
          name: 'item B',
          price: 30.5,
        },
        {
          id: 'CCC-CCC',
          name: 'item C',
          price: 20,
        },
      ];

      const basket = [
        { id: 'AAA-AAA', count: 2 },
        { id: 'CCC-CCC', count: 1 },
      ];

      const total = calculateTotal(goods, basket);

      expect(total).toBe(40);
    });
  });

  describe('Stack: Implement stack data structure  using array. LIFO(Last in First Out)', () => {
    class Node {
      constructor(value, next) {
        this.value = value;
        this.next = next;
      }
    }
    
    class Stack {
      #head;
      #length;
    
      constructor() {
        this.#head = null;
        this.#length = 0;
      }
    
      get length() {
        return this.#length;
      }
    
      push(value) {
        const newNode = new Node(value, this.#head);
        this.#head = newNode;
        this.#length++;
      }
    
      pop() {
        if(this.#length <= 0) {
          throw new Error('Stack is empty');
        }

        const value = this.#head.value;

        this.#head = this.#head.next;
        this.#length--;

        return value;
      }
    
      isEmpty() {
        return !this.#length;
      }
    
      toArray() {
        const arr = [];
        let head = this.#head;
        let i = this.#length - 1;
    
        while(head) {
          arr[i--] = head.value;
          head = head.next;
        }

        return arr;
      }
    }

    class Stack1 {
      #array;
    
      constructor() {
        this.#array = [];
      }
    
      get length() {
        return this.#array.length;
      }
    
      get array() {
        return this.#array;
      }
    
      push(value) {
        const index = this.#array.length;
        this.#array[index] = value;
      }
    
      pop() {
        if(this.#array.length <= 0) {
          throw new Error('Stack is empty'); 
        }
    
        const value = this.#array.at(-1);
        this.#array.length--;
    
        return value; 
      }
    
      isEmpty() {
        return !this.#array.length;
      }
    }

    it('Should add new elements to the end of stack', () => {
      const stack = new Stack();

      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.toArray()).toStrictEqual([1, 2, 3]);
    });

    it('Pop removes an element from the stack and return removed element', () => {
      const stack = new Stack();

      stack.push(1);
      stack.push(2);
      stack.push(3);
      stack.push(4);
      
      expect(stack.pop()).toBe(4);
      expect(stack.pop()).toBe(3);
      expect(stack.toArray()).toStrictEqual([1, 2]);
    });

    it('Pop removes an element from the stack, if the function is call on an empty should throw exception', () => {
      const stack = new Stack();

      stack.push(1);
      stack.push(2);

      stack.pop();
      stack.pop();
      
      expect(() => stack.pop()).toThrow('Stack is empty');
      expect(stack.toArray()).toStrictEqual([]);
    });
    
    it('isEmpty returns true if the stack is empty', () => {
      const stack = new Stack();
      
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('Queue: Implement Queue data structure using array. FIFO(First in First Out) ', () => {
    class Queue {
      #array;
    
      constructor() {
        this.#array = [];
      }
    
      get length() {
        return this.#array.length;
      }
    
      get array() {
        return this.#array;
      }
    
      enqueue(value) {
        const index = this.#array.length;
        this.#array[index] = value;
      }
    
      dequeue() {
        if(this.#array.length <= 0) {
          throw new Error('Queue is empty')
        }
    
        const value = this.#array[0];
    
        for(let i = 0; i < this.#array.length - 1; i++) {
          this.#array[i] = this.#array[i + 1];
        }
        
        this.#array.length--;
    
        return value;
      }
    
      isEmpty() {
        return !this.#array.length;
      }
    }    

    it('Enqueue adds an element to the queue', () => {
      const queue = new Queue();

      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.array).toStrictEqual([1, 2, 3]);
    });

    it('Enqueue removes an element from the queue and return removed element', () => {
      const queue = new Queue();

      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.array).toStrictEqual([3, 4]);
    });

    it('Enqueue removes an element from the queue, if the function is call on an empty should throw exception', () => {
      const queue = new Queue();

      queue.enqueue(1);
      queue.enqueue(2);

      queue.dequeue();
      queue.dequeue();
      
      expect(() => queue.dequeue()).toThrow('Queue is empty');
      expect(queue.array).toStrictEqual([]);
    });
    
    it('isEmpty returns true if the queue is empty', () => {
      const queue = new Queue();
      
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Reduce. Own implementation of Array.reduce', () => {
    Array.prototype.newReduce = function(callback, initial) {
      if(this.length === 0 && initial === undefined) {
        throw new TypeError();
      }
    
      let accumulator = initial === undefined ? this[0] : initial;
      let start = initial === undefined ? 1 : 0
    
      for (let i = start; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
      }
    
      return accumulator;
    }

    it('Should return value that results from running the "reducer" callback function', () => {
      const getSum = (a, b) => a + b;
      const initial = 0;

      expect([1, 2, 3, 4].newReduce(getSum, initial)).toBe(10);
    });
    
    it('If array is empty than return initial value', () => {
      const getSum = (a, b) => a + b;
      const initial = 50;

      expect([].newReduce(getSum, initial)).toBe(50);
    });

    it('If the second parameter is not provided than initial value is equal to first array element', () => {
      const getSum = (a, b) => a + b;
      const initial = 50;

      expect([].newReduce(getSum, initial)).toBe(50);
    });

    it('If the second parameter is not provided and the array is empty than throw TypeError', () => {
      const getSum = (a, b) => a + b;

      expect(() => [].newReduce(getSum)).toThrow(TypeError);
    });
  });
});
