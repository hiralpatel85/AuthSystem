const crypto = require('crypto');

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports = {
  generateVerificationCode,
  addMinutes,
};
