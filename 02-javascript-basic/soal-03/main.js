let number = Math.random();

const randomNumber = () => {
  return Math.random();
};

while (number <= 0.9) {
  number = randomNumber();
  console.log(number);
}
