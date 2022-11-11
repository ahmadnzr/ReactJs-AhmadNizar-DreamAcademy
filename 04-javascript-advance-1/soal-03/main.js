const result = document.getElementById("note");
const numberg = document.getElementById("number");
const start = document.getElementById("start");
const stop = document.getElementById("stop");

let number;
let undi;

const startUndian = () => {
  result.innerHTML = "";
  numberg.innerHTML = "0";
  if (!undi) {
    undi = setInterval(() => {
      number = Math.trunc(Math.random() * 100);
      numberg.innerHTML = number;
    }, 30);
  }
};

const stopUndian = () => {
  clearInterval(undi);
  undi = null;

  const menang = number % 2 !== 0;
  if (menang) {
    result.innerHTML = "MENANG";
    return;
  }
  result.innerHTML = "KALAH";
};

start.addEventListener("click", startUndian);
stop.addEventListener("click", stopUndian);
