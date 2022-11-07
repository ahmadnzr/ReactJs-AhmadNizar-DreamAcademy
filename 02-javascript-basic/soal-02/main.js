const checkValidNumber = (arg) => {
  return typeof arg === "number" && arg >= 0 && Number.isInteger(arg)
  ? true
  : false;
};

const factorial = (number, fn) => {
  if (!fn(number)) return null;

  let value = 1;
  for (let i = number; i > 0; i--) {
    value *= i;
  }

  return value;
};

const testCase = [10, 13, 0, -5, "oke", "10", "6", true, 5.4, 1];
testCase.forEach((item) => {
  console.log(factorial(item, checkValidNumber));
});
