const checkValidAge = (arg) => {
  return typeof arg === "number" && arg >= 0 && Number.isInteger(arg)
    ? true
    : false;
};

const checkAge = (age, fn) => {
  if (!fn(age)) return "invalid age";

  if (age <= 17) return "bawah umur";
  if (age <= 29) return "young adult";
  if (age <= 60) return "dewasa";
  if (age > 60) return "tua";
};

const testCase = [0, 10, "50", 29.5, "muda", true, 18];

testCase.forEach((item) => {
  console.log("Anda adalah seorang", checkAge(item, checkValidAge));
});
