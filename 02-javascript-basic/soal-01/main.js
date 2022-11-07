const checkName = (name) => {
  if (name.length < 20) return "Halo,", name;

  if (name.length >= 20) return "Panjang umur yang mulia", name;

  return "Maaf, saya tidak bisa mengeja namanya";
};

const testCase = ["John Due", "Sri Sultan Hamengkubuwono I", 10, true];

testCase.forEach((item) => {
  console.log(checkName(item));
});
