exports.getDay = () => {
  const days = ["minggu", "senin", "selasa", "rabu", "kamis", "jumat", "sabtu"];
  const today = new Date();
  return days[today.getDay()];
};

exports.getDate = () => {
  const today = new Date();
  const currentDate = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}`;
  return currentDate;
};
