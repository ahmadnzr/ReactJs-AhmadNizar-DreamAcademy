const checkValidText = (text) => {
  const validText = new RegExp(/[a-z]/i);

  return validText.test(text);
};

const checkVokalText = (text) => {
  const vocal = ["a", "i", "u", "e", "o"];

  return vocal.includes(text) ? "vokal" : "konsonan";
};

["mempertanggunjawabkan", "merdeka!", "100", "Amin"].map((word) => {
  const w = word
    .toLowerCase()
    .split("")
    .map((char) => {
      const valid = checkValidText(char);
      return valid ? checkVokalText(char) : "invalid";
    });

  console.log(w.toString());
});
