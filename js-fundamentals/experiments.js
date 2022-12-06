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

const loggedExample = logMe(logger)((arg) => arg);

console.log(loggedExample('test1'));
console.log(logger.messages); // ['start', 'end'];