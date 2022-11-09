const today = "09/11/2022";
const products = [
  {
    productionDate: "2022-01-01",
    expiredDate: "10/06/2023",
  },
  {
    productionDate: "2022-02-14",
    expiredDate: "17/08/2022",
  },
];
const formatDate = (str) => {
  const date = str.split("/");
  if (date.length > 1) {
    return new Date(`${date[2]}-${date[1]}-${date[0]}`);
  }

  return new Date(str);
};

const getDiff = (date1, date2) => {
  const diff = date1.getTime() - date2.getTime();
  return diff / (1000 * 3600 * 24);
};

const productDetails = products.map((product) => {
  const { productionDate, expiredDate } = product;
  const fProductionDate = formatDate(productionDate);
  const fExpiredDate = formatDate(expiredDate);
  const fToday = formatDate(today);

  const expiredIn = getDiff(fExpiredDate, fToday);

  return {
    productionDate,
    expiredDate,
    shelfLife: getDiff(fExpiredDate, fProductionDate),
    age: getDiff(fToday, fProductionDate),
    expiredIn,
    isExpired: expiredIn < 0 ? true : false,
  };
});

console.log(productDetails);
