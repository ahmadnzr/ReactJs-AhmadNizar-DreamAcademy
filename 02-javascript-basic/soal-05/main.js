const checkName = (name) => {
  if (name?.length < 20) return "Halo, " + name;

  if (name?.length >= 20) return "Panjang umur yang mulia " + name;

  return "Maaf, saya tidak bisa mengeja namanya";
};

const checkAge = (age, fn) => {
  if (!fn(age)) return "invalid age";

  if (age <= 17) return "bawah umur";
  if (age <= 29) return "young adult";
  if (age <= 60) return "dewasa";
  if (age > 60) return "tua";
};

const checkValidAge = (arg) => {
  return typeof arg === "number" && arg >= 0 && Number.isInteger(arg)
    ? true
    : false;
};

const userInfo = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return "Saya tidak bisa membaca data anda";
  }

  const role = checkAge(obj.age, checkValidAge);
  const name = checkName(obj.name);

  return name + " Golongan anda adalah " + role;
};

const testCase = [
  { name: "Jokowwei", age: 50 },
  { name: "Sri Sultan Hamengkubuwono I", age: 50 },
  { name: "Prabowo" },
  { name: "" },
  null,
  10,
  true,
  undefined,
  {},
  "",
];

testCase.forEach((item) => {
  console.log(userInfo(item));
});
