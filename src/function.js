const min = 1000000000;
const max = 9999999999;
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
module.exports = randomNumber.toString();
