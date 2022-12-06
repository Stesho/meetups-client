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

const errHandler = callMeWithErrorHandling(fn1, fn2, fn3);

console.log(errHandler(-5));