const checkValidNumber = (arg) => {
  if (typeof arg !== "number") {
    return false;
  }

  return arg >= 0 ? true : false;
};

const factorial = (number, fn) => {
  if (!fn(number)) return null;
  
  let value = 1;
  for (let i = number; i > 0; i--) {
    value *= i;
  }

  return value;
};

console.log(factorial(10, checkValidNumber));
console.log(factorial(13, checkValidNumber));
console.log(factorial(0, checkValidNumber));
console.log(factorial(-5, checkValidNumber));
console.log(factorial("oke", checkValidNumber));
console.log(factorial("10", checkValidNumber));
console.log(factorial("6", checkValidNumber));
console.log(factorial(true, checkValidNumber));
