function isDate(str) {
  const date = new Date(str).toUTCString();
  return date === "Invalid Date" ? false : true;
}

function isUnix(str) {
  const date = str;
  //   console.log(!Number.isNaN(date) && date.length === 13);
  return !Number.isNaN(date) && date.length === 13;
}

module.exports = { isDate, isUnix };
