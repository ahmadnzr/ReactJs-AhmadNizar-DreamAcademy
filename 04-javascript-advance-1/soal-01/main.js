document.getElementById("btn").addEventListener("click", () => {
  const today = new Intl.DateTimeFormat("id-ID", {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  alert(today);
});
