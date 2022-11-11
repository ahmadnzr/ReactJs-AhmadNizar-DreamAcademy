const form = document.querySelector("form");
const iName = document.querySelectorAll("input")[0];
const iDate = document.querySelectorAll("input")[1];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { age, birthdayIn } = info(iDate.value);
  const { age: mAge, birthdayIn: mBirthDayIn } = infoWithMoment(iDate.value);

  console.log("object Date =>\n", getBirthDay(age, birthdayIn));
  console.log("moment =>\n", getBirthDay(mAge, mBirthDayIn));
});

const getBirthDay = (age, birthday) => {
  const birthdayIn =
    birthday > 0
      ? `${Math.abs(birthday)} hari lagi`
      : `${Math.abs(birthday)} hari yang lalu`;

  return `Halo, ${iName.value}. Usia anda adalah ${age} tahun. Anda berulangan tahun ${birthdayIn}`;
};

const info = (date) => {
  const now = new Date();
  const born = new Date(date);
  const birthday = new Date(
    now.getFullYear(),
    born.getMonth(),
    born.getDate()
  ).getTime();
  const age = new Date(now - born.getTime()).getUTCFullYear() - 1970;

  return {
    age: age > 0 ? age : 0,
    birthdayIn: Math.round((birthday - now.getTime()) / (1000 * 3600 * 24)),
  };
};

const infoWithMoment = (date) => {
  const now = moment();
  const born = moment(date);

  const birthday = moment({
    year: now.year(),
    month: born.month(),
    date: born.date(),
  });

  const age = now.diff(born, "year");

  return {
    age: age > 0 ? age : 0,
    birthdayIn: Math.round(birthday.diff(now, "day", true)),
  };
};
