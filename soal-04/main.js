const checkValidAge = (arg) => {
  if (typeof arg !== "number") {
    return false;
  }

  return arg >= 0 && Number.isInteger(arg) ? true : false;
};

const checkAge = (age, fn) => {
  if (!fn(age)) return "invalid age";

  if (age <= 17) return "bawah umur";
  if (age <= 29) return "young adult";
  if (age <= 60) return "dewasa";
  if (age > 60) return "tua";
};

console.log("Anda adalah seorang", checkAge(0, checkValidAge));
console.log("Anda adalah seorang", checkAge(10, checkValidAge));
console.log("Anda adalah seorang", checkAge("50", checkValidAge));
console.log("Anda adalah seorang", checkAge(29.5, checkValidAge));
console.log("Anda adalah seorang", checkAge("muda", checkValidAge));
console.log("Anda adalah seorang", checkAge(true, checkValidAge));
