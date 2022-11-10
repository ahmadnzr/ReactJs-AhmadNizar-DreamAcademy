const button = document.getElementById("btn");

const logs = [];

button.addEventListener("click", () => {
  const getTime = moment().format("HH:mm:ss");
  logs.push(getTime);

  logs.map((item) => {
    const log = item.split(":");

    console.log(`Tercatat jam ${log[0]}, Menit ${log[1]}, Detik ${log[2]}`);
  });
});
