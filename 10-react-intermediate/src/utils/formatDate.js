const formatDate = (date) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  })
    .format(newDate)
    .split(",")
    .join(" ");
};

export { formatDate };
