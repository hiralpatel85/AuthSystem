const crypto = require('crypto');

const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString('hex');
};

const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports = {
  generateVerificationCode,
  addMinutes,
};
