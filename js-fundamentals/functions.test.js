const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};
describe('Function and closure', () => {
  describe('compose: composition of functions', () => {
    /**
     * @example
     * compose(fn1, fn2, fn3, fn4) === fn1(fn2(fn3(fn4(arg))))
     */

     function composeFunc(...funcs) {
      return function(x) {
        return funcs.reduceRight((prevFunc, currFunc) => currFunc(prevFunc), x);
      }
    }

    const compose = composeFunc;

    test('If compose make composition of functions', () => {
      const mult2 = (x) => x * 2;
      const plus3 = (x) => x + 3;
      const plus4 = (x) => x + 4;

      const multiply = compose(plus4, plus3, mult2)

      expect(multiply(2)).toBe(11);
    });
  });

  describe('createIncrementor: create function that each time return new value incremented by incrementValue and start from start', () => {
    function incrementor(init, step) {
      let value = init - step;
      return function() {
        return value += step;
      }
    }

    const createIncrementor = incrementor;

    test('Should increment by step each time function called', () => {
      const nextFrom10By7 = createIncrementor(10, 7);

      expect(nextFrom10By7()).toBe(10);
      expect(nextFrom10By7()).toBe(17);
      expect(nextFrom10By7()).toBe(24);
    });
  });

  describe('createUserCreator: create new user with unique number identifier using increment', () => {
    function createUser(initialID = 0) {
      let identifier = initialID;
      return function(name) {
        return {
          name,
          id: identifier++
        }
      }
    }

    const createUserCreator = createUser;
    
    test('Should create new user with incremented id', () => {
      const createUser = createUserCreator(1); // 1 is start id.
      
      expect(createUser('Ivan')).toStrictEqual({ name: 'Ivan', id: 1 });
      expect(createUser('Petr').name).toBe('Petr');
      expect(createUser('Anna').id).toBe(3);
    });
    
    test('If initial id not passed than initial id is equal to 0', () => {
      const createUser = createUserCreator(); // 1 is start id.

      expect(createUser('Ivan')).toStrictEqual({ name: 'Ivan', id: 0 });
      expect(createUser('Petr').name).toBe('Petr');
      expect(createUser('Anna').id).toBe(2);
    });
  });

  describe('createGetterSetter', () => {
    /***
     *  Function should return object with 2 methods: setValue and getValue.
     *  @example
     *  obj = createGetterSetter(10)
     *  obj.getValue(); // 10
     *  obj.setValue(20);
     *  obj.getValue(); //20
     */

     function createObject(initial = undefined) {
      return {
        value: initial,
        getValue() { 
          return this.value
        },
        setValue(newValue) {
          this.value = newValue;
        }
      }
    }

    // alternative solution
    function createObject1(initial = undefined) {
      let value = initial;
      return {
        getValue() { 
          return value
        },
        setValue(newValue) {
          value = newValue;
        }
      }
    }

    const createGetterSetter = createObject1;

    test('Created obj should have getValue and setValue methods', () => {
      obj = createGetterSetter(10);

      obj.setValue(20);
      
      expect(obj.getValue()).toBe(20);
    });
    
    test('If initial id is not passed than initial id is equal to undefined', () => {
      obj = createGetterSetter();
      
      expect(obj.getValue()).toBe(undefined);
    });
  });

  describe('calcCall calculates number of function calls', () => {
    function fn() {
      // DON'T CHANGE ME
      return 'test';
    }

    function calcCall(func) {
      let count = 0;
      const incrementCount = () => {
        ++count;
        return func();
      }
      const getCount = () => count;
      
      return [incrementCount, getCount];
    }    

    test('Calculate function invocation', () => {
      const [callFn, getFnCount] = calcCall(fn);
      const [callFn2, getFn2Count] = calcCall(fn);

      callFn();
      callFn();
      expect(callFn()).toBe('test');
      expect(getFnCount()).toBe(3);
      callFn();
      expect(getFnCount()).toBe(4);
      callFn2();
      expect(getFn2Count()).toBe(1);
      callFn2();
      expect(getFn2Count()).toBe(2);
    });
  });

  describe('memoization', () => {
    // Before start see next task with memoize function to understand difference
    describe('memoizeLast Creates a function that memoizes the last result of function', () => {
      function memoizeLast(fn) {
        let lastResult = null;
        let lastResultArgument = null;
        return function(arg) {
          if(lastResultArgument === arg) {
            return lastResult;
          }
          lastResult = fn(arg);
          lastResultArgument = arg;
          return lastResult;
        }
      }

      // DON'T CHANGE.
      let invokesCount = 0;
      function formula(x) {
        // DON'T CHANGE.
        invokesCount++;
        return 10 * x + 5;
      }

      
      test('Should cache the result of function with single argument', () => {
        const memoizedFormula = memoizeLast(formula);
        
        expect(memoizedFormula(10)).toBe(105);
        expect(memoizedFormula(10)).toBe(105);
        expect(invokesCount).toBe(1);
        expect(memoizedFormula(5)).toBe(55);
        expect(invokesCount).toBe(2);
        expect(memoizedFormula(10)).toBe(105); // Recalculated
        expect(invokesCount).toBe(3);
      });

      /**
       *  https://jestjs.io/docs/mock-functions
       *  toHaveBeenCalledTimes = https://jestjs.io/docs/expect#tohavebeencalledtimesnumber
       */
      test('Callback should only be called when recalculating', () => {
        const fn = jest.fn();
        const memoizedFormula = memoizeLast(fn);
        
        memoizedFormula(10);
        memoizedFormula(10);
        memoizedFormula(5);

        expect(fn).toHaveBeenCalledTimes(2);
      });
    });

    describe('memoize Creates a function that memoizes all previous result of function invocation', () => {
      function memoize(fn) {
        let result = [];
        let resultArgument = [];

        return function(arg) {
          let index = resultArgument.indexOf(arg);
          if(index !== -1) {
            return result[index];
          }

          result.push(fn(arg));
          resultArgument.push(arg);

          return result.at(-1);
        }
      }

      // DON'T CHANGE.
      let invokesCount = 0;
      function formula(x) {
        // DON'T CHANGE.
        invokesCount++;
        return 10 * x + 5;
      }

      test('Should cache the result of function with single argument', () => {

        const memoizedFormula = memoize(formula);

        expect(memoizedFormula(10)).toBe(105);
        expect(memoizedFormula(10)).toBe(105);
        expect(invokesCount).toBe(1);
        expect(memoizedFormula(5)).toBe(55);
        expect(invokesCount).toBe(2);
        expect(memoizedFormula(10)).toBe(105); // Get result from a cache
        expect(invokesCount).toBe(2);
      });

      /**
       *  https://jestjs.io/docs/mock-functions
       *  toHaveBeenCalledTimes = https://jestjs.io/docs/expect#tohavebeencalledtimesnumber
       */
      test('Callback should only be called when recalculating', () => {
        const fn = jest.fn();
        const memoizedFormula = memoize(fn);
        
        memoizedFormula(10);
        memoizedFormula(10);
        memoizedFormula(5);
        memoizedFormula(10);
        memoizedFormula(5);

        expect(fn).toHaveBeenCalledTimes(2);
      });
    });
  });

  // In this task you don't need to write function implementation
  // You have to write test using mocks and spy https://jestjs.io/docs/mock-functions

  describe('Mocking: try to use jest mock and spy', () => {
    // DON'T CHANGE.
    const logger = {
      messages: [],
      log: function (message) {
        this.messages.push(message);
      },
    };

    // DON'T CHANGE.
    const logMe =
      (logger) =>
      (fn) =>
      (...args) => {
        logger.log('start');
        const result = fn(...args);
        logger.log('end');
        return result;
      };

    test('logMe should log start and end of call js function', () => {
      const fn = jest.fn((arg) => arg);
      const loggedExample = logMe(logger)(fn);
      
      expect(loggedExample('test1')).toBe('test1');
      expect(fn.mock.calls.length).toBe(1);
      expect(fn.mock.calls[0][0]).toBe('test1');
      expect(fn.mock.results[0].value).toBe('test1');
      expect(logger.messages).toStrictEqual(['start', 'end']);
    });

    test('logger.log should be called twice on each logMe call', () => {
      logger.log = jest.fn(logger.log);
      const loggedExample = logMe(logger)((arg) => arg);
      
      expect(loggedExample('test1')).toBe('test1');
      expect(logger.log.mock.calls.length).toBe(2);
      expect(logger.log.mock.calls[0][0]).toBe('start');
      expect(logger.log.mock.calls[1][0]).toBe('end');
    });
  });

  describe('Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.', () => {
    function once(fn) {
      const maxCalls = 1;
      let value = null;
      let count = 0;

      return function() {
        if(count < maxCalls) {
          value = fn();
          count++;
        }

        return value; 
      }
    }

    test('Callback should be invoked once', () => {
      // DON'T CHANGE
      let callsCount = 0;
      // DON'T CHANGE
      function init() {
        callsCount++;
      }

      const mockInit = jest.fn(init);
      const initialize = once(mockInit);
      initialize();
      initialize();
      initialize();

      expect(mockInit).toBeCalledTimes(1);
    });
  });

  describe('partial Creates a function that invokes func with partials prepended to the arguments it receives.', () => {
    /***
     * @example
     * const add = (a, b) => a + b
     * const add10 = partial(add, 10)
     * add10(5); // 15
     */
     function partial(fn, init) {
      return function(arg) {
        return fn(init, arg);
      }
    }    

    test('Should add provided value to init value', () => {
      const add = (a, b) => a + b;
      const add10 = partial(add, 10);
      
      expect(add10(5)).toBe(15);
      expect(add10(0)).toBe(10);
    });
  });

  describe('findNode: recursion', () => {
    const node = {
      name: 'Name 1',
      key: 'AAA-AAA',
      items: [
        {
          name: 'Name 1.1',
          key: 'BBB-BBB',
        },
        {
          name: 'Name 1.2',
          key: 'DDD-DDD',
          items: [
            {
              key: 'CCC-CCC',
              name: 'Name 1.2.1',
            },
            {
              key: 'EEE-EEE',
              name: 'Name 1.2.2',
              items: [],
            },
          ],
        },
      ],
    };
    /**
     * TODO
     * @example
     *  find(data, "DDD-DDD"); // { name: "Name 1.2", key: 'DDD-DDD', items: [...] }
     *   find(data, "AAA-AAA"); // { name: "Name 1", key: 'AAA-AAA', items: [ ... ] }
     *   find(data, "EEE-EEE"); // { name: "Name 1.2.2", key: 'EEE-EEE', items: [ ... ] }
     */
     function find(node, key) {
      if(node.key === key) {
        return node;
      }
    
      if(!('items' in node)) {
        return undefined;
      }
    
      for(let item of node.items) {
        let newNode = find(item, key);
        if(newNode) {
          return newNode;
        }
      }
    }

    const findNode = find;

    it('Should recursively find node', () => {
      expect(findNode(node, 'AAA-AAA')).toStrictEqual(node);
      expect(findNode(node, 'BBB-BBB')).toStrictEqual(node.items[0]);
      expect(findNode(node, 'CCC-CCC')).toStrictEqual(node.items[1].items[0]);
    });

    it('Should return undefined if node is not found', () => {
      expect(findNode(node, '')).toStrictEqual(undefined);
    });
  });

  describe('error handling: try/catch/finally', () => {
    /**
     *
     * @param callMe Should be wrapped by try /catch block
     * @param callMeOnErrorFn Should be called if callMe throws an error
     * @param callMeInAnyCase Should be called in any case (finally)
     */
    const callMeWithErrorHandling = (
      callMe,
      callMeOnErrorFn,
      callMeInAnyCase
    ) => (arg) => {
      try {
        callMe(arg);
      }
      catch(error) {
        callMeOnErrorFn(error);
      }
      finally {
        return callMeInAnyCase();
      }
    };

    const fn1 = (arg) => {
      if(arg > 0) {
        return arg;
      }
      throw new Error('Inavlid arg');
    };
    const fn2 = (error) => error.message;
    const fn3 = () => 'Invoke anyway';

    
    it('If callMe throw the Error then callMeOnErrorFn should be called', () => {
      const mockfn2 = jest.fn(fn2);
      const errHandler = callMeWithErrorHandling(fn1, mockfn2, fn3);
      
      expect(errHandler(10)).toBe('Invoke anyway');
      expect(mockfn2).not.toHaveBeenCalled();
    });
    
    it('If callMe throw the Error then callMeOnErrorFn should be called', () => {
      const mockfn2 = jest.fn(fn2);
      const errHandler = callMeWithErrorHandling(fn1, mockfn2, fn3);
      
      expect(errHandler(-10)).toBe('Invoke anyway');
      expect(mockfn2).toHaveBeenCalled();
    });
  });

  describe('useState:', () => {
    /***
     *  useState is similar to React.useState, but has significant different:
     *  - it uses unique name (first argument) to distinguish different useState instead of invocation order
     *  - It can be called in any function in any place
     * @example
     *     const [value, setValue] = useState('Unique state name', 'initial value')
     *     const [year, setYear] = useState('year', 2000)
     *     value; // 2000
     *     setValue(2015);
     *     value; // 2000
     *     const  [updatedYear] = useState('year', 2000)
     *     updatedYear; // 2015
     *     const [month, setMonth] = useState('month', 'Jan');
     *     month;// Jan
     *     setMonth('Feb');
     *     const [updatedMonth] = useState('month', 'Jan');
     *     updatedMonth; // Feb
     *     const  [updatedYear2] = useState('year', 2000)
     *     updatedYear; // 2015
     */
    const useState = TODO_IMPLEMENT_ME;
  });
});
