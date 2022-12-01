# JavaScript Fundamentals

Exercises to learn fundamental part of JavaScript: array, object, closure, composition and async.

## Setup your development environment

### Git

- install [git](https://git-scm.com/downloads)

### Editors

- [VSCode](https://code.visualstudio.com/) - Free
- [WebStorm](https://www.jetbrains.com/webstorm/) - Paid

### Terminal

If you use windows use

- [git-bash](https://git-scm.com/downloads) easy way. If you've installed git, you already have git-bash.
- Bash from [WSL](https://learn.microsoft.com/en-us/windows/wsl/about) Better way but hart to setup properly

If you use Linux or MacOs you already have a good terminal

### Install Node.js using node version manager

- For `Windows` use [nvm-windows](https://github.com/coreybutler/nvm-windows)
- For `Mac` and `Linux` use [nvm](https://github.com/coreybutler/nvm-windows))

If you use WSL you have to install `nvm` on your WSL Linux

install latest node lts version

```sh
nvm install --lts
nvm use --lts
```

### Clone project

### Open project in editor

open terminal
run `npx jest`

### Unit testing

For each task you need to write implementation and [Unit test](https://en.wikipedia.org/wiki/Unit_testing).

For testing we will use [Jest](https://jestjs.io/)
For introduction read:

- [How to test and why](https://doka.guide/js/how-to-test-and-why/)
- [Jest Getting started](https://jestjs.io/docs/en/getting-started)
- [Jest Using matchers](https://jestjs.io/docs/en/using-matchers)

#### How to run tests

[npx doc](https://docs.npmjs.com/cli/v8/commands/npx)
[jest cli](https://jestjs.io/docs/cli)

- `npx jest` - run all test
- `npx jest --watch` - run all test in watch mode
  - Press `a`, `f`, `o`, `p`, `t` to apply different filters
- `npx jest example.test.js` - run all test in the `example.test.js` file
- `npx jest example.test.js --watch` - run all test in the `example.test.js` file in watch mode

To run test you can use command from the script section in the `package.json`
You can add own commands too

```json
{
  "scripts": {
    "t:example": "jest example.test.js",
    "t:example-final": "jest example.final.test.js",
    "t:array": "jest array.test.js --watch"
  }
}
```

- `npm run t:example` - Run test from `example.test.js` file
- `npm run t:example-final` - Run test from `example-final.test.js` file
- `npm run t:array` - Run test from `array.test.js` file in watch mode

### Resources

- https://github.com/nodejs/release#release-schedule
- [MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference)
- [doka.guide ru](https://doka.guide/js/)
- [JavaScript.info en/ru](http://javascript.info)
- [33 Concepts Every JavaScript Developer Should Know](https://github.com/leonardomso/33-js-concepts)

### How to

For all task you have to write implementation.
For all task you have to write tests, some task can have already added tests, but you still need to add additional tests.

Each task is a separate `describe` block which contains a brief explanation of expected function behavior. Another
description of function behavior can be provided through comments, examples and tests.

Example of solving task with explanation: [initial task](example.test.js) and [solution](./example.final.test.js)
   
### IMPORTANT
If you have given to write function that behavior close to native implementation or repeat it, you have to write your own implementation instead of using native methods.
For example:
- `flatten array task` - you have to implement your own function instead of using `Array.flat`
- `array reduce task` - you have to implement your own reduce function instead of using `Array.reduce`

In other cases, you can use native methods.

**If you see few different approaches to solve task, you can implement all of them, it will be a bonus**.

#### Abbreviation

##### TODO_IMPLEMENT_ME

You have to replace `fn` by implementation. Until it will raise exception with remainder `Function is not implemented!`
each times when it functions is called inside test.

```js
const fn = TODO_IMPLEMENT_ME;
```

##### jest.todo

```js
// Write needed tests to test implementation
test.todo('Write  tests');

// Add additional tests to test all case
it.todo('Write additional tests');

// Description of expected behaviour
// You have to write both implementation and tests
it.todo('enqueue adds an element to the queue');
it.todo('dequeue removes an element from the queue');
it.todo('isEmpty returns true if the queue is empty');
```

##### // Don't change

```js
// Don't change variable initialisation
// DON'T CHANGE
let callsCount = 0;

// Don't change function implementation

// DON'T CHANGE
function init() {
  callsCount++;
}
```

#### @example

Examples of function usage and expected result

```js
/***
 * @example
 * const add = (a, b) => a + b
 * const add10 = partial(add, 10); // example of usage
 * add10(5); // 15 - expected result
 */
function partial(fn, arg1) {
  // TODO: implement
}
```

#### // TODO

Some code should be written or changed

```js
function once(fn) {
  // TODO: implement
}

const findMax = (arr) => {
  // TODO: fix me - fix next line to achive expected behaviour
  return Math.max(arr);
};
```

## Exercises

### Array

- [exercises](./array.test.js)
- [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Arrays](https://javascript.info/array)
- [Arrays methods](https://javascript.info/array-methods)

### Object

- [Exercises](./object.test.js)
- [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Objects](https://javascript.info/object)
- [Object references and copying](https://javascript.info/object-copy)

### Functions, composition, closure

- [Exercises](./functions.test.js)
- [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [Recursion](https://learn.javascript.ru/recursion)
- [Closure](https://learn.javascript.ru/closure)
- [Composition](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)

### this

- [Exercises](./this.test.js)
- [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [Function Context ru](https://doka.guide/js/function-context/)

### async

- [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise Ru](https://doka.guide/js/promise/)
- [Event loop video](https://youtu.be/cCOL7MC4Pl0)
- [Event loop MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [Event loop](https://learn.javascript.ru/event-loop)
- [Async in JS](https://doka.guide/js/async-in-js/)
