const checkValidText = (char) => {
  const validText = new RegExp(/[a-z]/i);

  return validText.test(char);
};

const checkVokalText = (char) => {
  const vocal = ["a", "i", "u", "e", "o"];

  return vocal.includes(char) ? "vokal" : "konsonan";
};

document.getElementById("myInput").addEventListener("change", (e) => {
  const text = e.target.value;
  const w = text
    .toLowerCase()
    .split("")
    .map((char) => {
      const valid = checkValidText(char);
      return valid ? checkVokalText(char) : "invalid";
    });

  document.getElementById("text").innerHTML = text;
  document.getElementById("result").innerHTML = w.toString();
  e.target.value = "";
});
