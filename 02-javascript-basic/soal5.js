const checkName = (name) => {
  if (name?.length > 0 && name.length < 20) return "Halo " + name;

  if (name?.length >= 20) {
    console.log("Panjang umur yang mulia", name);
    return "Panjang umur yang mulia ", name;
  }

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
  if (typeof arg !== "number") {
    return false;
  }

  return arg >= 0 && Number.isInteger(arg) ? true : false;
};

const userInfo = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    console.log("Saya tidak bisa membaca data anda");
    return;
  }

  const role = checkAge(obj.age, checkValidAge);
  const name = checkName(obj.name);

  console.log(name, "Golongan anda adalah", role);
};

userInfo({ name: "Jokowwei", age: 50 });
userInfo({ name: "Prabowo" });
userInfo({ name: "" });
userInfo(null);
userInfo(10);
userInfo(true);
userInfo(undefined);
userInfo({});
userInfo("");
