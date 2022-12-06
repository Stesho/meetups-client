const TODO_IMPLEMENT_ME = () => {
  throw Error('Function is not implemented!');
};

describe('Objects', () => {
  describe('clone object', () => {
    describe('shallowClone Creates shallow copy of object', () => {
      /***
       * @example
       * const obj ={a: '1', b: {b1: 'a', b2:'2;}}
       * const cloned =  shallowClone(obj)
       * cloned !== obj
       * cloned.a === obj.a
       * cloned.b === obj.b
       * cloned.b.b1 === obj.b.b1
       */

      function clone(obj) {
        const newObj = {};
      
        for(const prop in obj) {
          newObj[prop] = obj[prop];
        }
      
        return newObj;
      }

      // alternative solution 1
      function clone1(obj) {
        return Object.assign({}, obj);
      }
      
      // alternative solution 2
      function clone2(obj) {
        return {...obj};
      }

      const shallowClone = clone2;

      it('Object properties should copy by link', () => {
        const obj = {
          a: '1',
          b: {
            b1: 'a',
            b2:'2',
          },
        }
        
        const cloned = shallowClone(obj);

        expect(cloned !== obj).toBe(true);
        expect(cloned.a === obj.a).toBe(true);
        expect(cloned.b === obj.b).toBe(true);
        expect(cloned.b.b1 === obj.b.b1).toBe(true);
      });
    });

    describe('deepClone: Create deep copy of object. Use recursion', () => {
      /***
       * @example
       * const obj ={a: '1', b: {b1: 'a', b2:'2;}}
       * const cloned =  deepClone(obj)
       * cloned !== obj
       * cloned.a === obj.a
       * cloned.b !== obj.b
       * cloned.b.b1 === obj.b.b1
       */

      function clone(obj) {
        const newObj = {};
      
        for(const prop in obj) {
          if(typeof obj[prop] === 'object' && obj[prop] !== null) {
            newObj[prop] = clone(obj[prop]);
          }
          else {
            newObj[prop] = obj[prop];
          } 
        }
      
        return newObj;
      }
      
      // alternative solution
      function clone1(obj) {
        return JSON.parse(JSON.stringify(obj));
      }

      const deepClone = clone;

      it('Object properties should copy by value', () => {
        const obj = {
          a: '1',
          b: {
            b1: null,
            b2:'2',
          },
        }
        
        const cloned = deepClone(obj);

        expect(cloned !== obj).toBe(true);
        expect(cloned.a === obj.a).toBe(true);
        expect(cloned.b !== obj.b).toBe(true);
        expect(cloned.b.b1 === obj.b.b1).toBe(true);
      });
    });
  });

  describe('pick: creates an new object composed of picked object`s properties.', () => {
    /***
     * @example
     * const object = { a: 1, b: '2', c: 3 };
     * pick(object, ['a', 'c']); // { a: 1, c: 3 }
     * pick(object, ['c']); //  { c: 3 }
     */
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

    const pick = pick1;
    
    it('Should return an new object composed of picked object`s properties', () => {
      const object = { a: 1, b: '2', c: null };
      const props = ['a', 'c'];

      const picked = pick(object, props);

      expect(picked).toStrictEqual({a: 1, c: null}); 
    });

    it('Should work with empty object', () => {
      const object = {};
      const props = ['a', 'c'];

      const picked = pick(object, props);

      expect(picked).toStrictEqual({});
    });

    it('If the second parameter is not provided then throw exception', () => {
      const object = { a: 1, b: '2', c: 3 };

      expect(() => pick(object)).toThrow();
    });
  });

  describe('Object comparison', () => {
    describe('isEqual performs shallow comparison between two values', () => {
      /**
       * @example
       * const obj1 = { a: 1, b: 2 };
       * const obj2 = { a: 1, b: 2 };
       * const obj3 = { a: 1, b: 4 };
       * isEqual(obj1, obj2); // true
       * isEqual(obj1, obj3); // false
       */
      function isShallowEqual(obj1, obj2) {
        for(const prop in obj1) {
          if(obj1[prop] !== obj2[prop]) {
            return false;
          }
        }
      
        return true;
      }

      const isEqual = isShallowEqual;

      it('Should return true if objects have the same properties with the same values', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 1, b: 2 };
        const obj3 = { a: 1, b: 4 };

        expect(isEqual(obj1, obj2)).toBe(true);
        expect(isEqual(obj1, obj3)).toBe(false);
      });
    });

    describe('isDeepEqual performs deep comparison between two values', () => {
      /**
       * @example
       * const obj1 = { a: 1, b: { a: 2 } };
       * const obj2 = { a: 1, b: { a: 2 } };
       * isDeepEqual(obj1, obj2); // true
       */

      function isDeepEqual(obj1, obj2) {
        let obj1Len = Object.keys(obj1).length;
        let obj2Len = Object.keys(obj2).length;
      
        if(obj1Len !== obj2Len) {
          return false;
        }
      
        for(const prop in obj1) {
          if(typeof obj1[prop] === 'object' && typeof obj2[prop] === 'object' && obj1[prop] !== null && obj2[prop] !== null) {
            if(!isDeepEqual(obj1[prop], obj2[prop])) {
              return false;
            }
          }
          else if(obj1[prop] !== obj2[prop]) {
            return false;
          }
        }
      
        return true;
      }
      
      const isEqual = isDeepEqual;

      it('Should return true if objects have the same properties with the same values', () => {
        const obj1 = { a: 1, b: { a: null } };
        const obj2 = { a: 1, b: { a: null } };
        const obj3 = { a: 1, b: { a: 2 }, a: 2 };

        expect(isEqual(obj1, obj2)).toBe(true);
        expect(isEqual(obj1, obj3)).toBe(false);
      });
    });
  });

  describe('get: gets value from object by path.', () => {
    /***
     * @example
     * get({ a: { b: { c: 3 } }}, 'a') // { b: { c: 3 } }
     * get({ a: { b: { c: 3 } }, 'a.b.c') // 3
     */
    function get(obj, path) {
      if(path === '') {
        return obj;
      }

      let result = obj;
      path = path.split('.');
    
      path.forEach(prop => {
        result = result[prop];
      });
    
      return result;
    }

    it('Should return value from object by path', () => {
      const obj = { a: { b: { c: 3 } }}; 

      expect(get(obj, 'a')).toStrictEqual({ b: { c: 3 }});
      expect(get(obj, 'a.b.c')).toStrictEqual(3);
    });

    it('Should return object if empty string provided', () => {
      const obj = { a: { b: { c: 3 } }}; 

      expect(get(obj, '')).toStrictEqual({a: { b: { c: 3 }}});
    });
  });
});
